const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var Result = require('./constant');
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema;

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Expense-Analyzer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if unable to connect to the database
});

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});

const expenseSchema = new Schema({
    ExpenseType: String,
    ExpenseName: String,
    ExpenseAmount: Number,
    PaymentMode: String,
    ExpenseDate: Date,
    UserId: String,
    ExpenseId: { type: Number, default: 0 }
});

expenseSchema.pre('save', function (next) {
    this.ExpenseId += 1;
    next();
});

// Define Expense model
const Expense = mongoose.model('Expense', expenseSchema);

const userSchema = new Schema({
    Username: String,
    Password: String,
    AuthToken: String,
    UserId: { type: Number, default: 0 }
});

userSchema.pre('save', function (next) {
    this.UserId += 1;
    next();
});

const User = mongoose.model('User', userSchema)

app.post("/login", async (request, response) => {
    try {
        if (Object.keys(request.body).length === 0) {
            response.status(200).json({ error: "Data not Found" });
        }
        else {
            const { Username, Password } = request.body;
            const findUser = await User.findOne({ Username, Password });
            if (findUser) {
                const newId = uuidv4();
                const updatedUser = await User.findOneAndUpdate(
                    { Username, Password: Password },
                    { $set: { AuthToken: newId } },
                    { new: true } // Return the updated document
                ).select('+UserId');
                response.status(201).json({ Result: Result.Success, message: "User logged in successfully", UUID: newId, UserId: updatedUser.UserId });
            } else {
                response.status(400).json({ Result: Result.Failure, error: "Incorrect Username or Password" });
            }
        }
    }
    catch (error) {
        console.error("Error creating user: ", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/signup", async (request, response) => {
    try {
        if (Object.keys(request.body).length === 0) {
            response.status(200).json({ error: "Data not Found" });
        }
        else {
            const { Username, Password } = request.body;

            const findUser = await User.findOne({ Username });
            if (findUser) {
                response.status(400).json({ Result: Result.Failure, error: "Username already exists" });
            }
            else {
                const newUser = new User({
                    Username,
                    Password
                });

                await newUser.save();
                response.status(201).json({ Result: Result.Success, message: "User created successfully" });
            }
        }
    }
    catch (error) {
        console.error("Error creating user: ", error);
        response.status(500).json({ Result: Result.Failure, error: "Internal Server Error" });
    }
});

app.post("/save-expense", async (request, response) => {
    try {
        if (Object.keys(request.body).length === 0) {
            response.status(200).json({ error: "Data not Found" });
        }
        else {
            const { ExpenseType, ExpenseName, ExpenseAmount, PaymentMode, ExpenseDate, UserId } = request.body;

            const newExpense = new Expense({
                ExpenseType,
                ExpenseName,
                ExpenseAmount,
                PaymentMode,
                ExpenseDate,
                UserId
            });

            await newExpense.save();
            response.status(201).json({ message: "Expense saved successfully" });
        }
    }
    catch (error) {
        console.error("Error saving expense: ", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/get-expenses", async (request, response) => {
    try {
        // const groupedExpenses = {};
        const authToken = request.get('Authorization');
        const findUser = await User.findOne({ authToken });
        const { UserId } = request.body;
        if(UserId){
            const allExpenses = await Expense.find({ UserId });
            response.status(200).json(allExpenses);
        } else{
            response.status(200).json({ error: "UserId not Found" });
        }
        // allExpenses.forEach(expense =>{
        //     const expenseType = expense.ExpenseType;
        //     if(!(expenseType in groupedExpenses)){
        //         groupedExpenses[expenseType] = [];
        //     }
        //     groupedExpenses[expenseType].push(expense);
        // })
        
    }
    catch (error) {
        console.error("Error retrieving expense: ", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/delete-expense", async (request, response) => {
    try {
        // const groupedExpenses = {};
        const authToken = request.get('Authorization');
        const findUser = await User.findOne({ authToken });
        const { ExpenseId } = request.body;
        if(ExpenseId){
            const allExpenses = await Expense.findOneAndDelete({ ExpenseId });
            if(allExpenses){
                response.status(200).json({ message: "Expense deleted successfully" });
            } else{
                response.status(200).json({ message: "Failed to delete Expense" })
            }
        } else{
            response.status(200).json({ error: "UserId not Found" });
        }
        // allExpenses.forEach(expense =>{
        //     const expenseType = expense.ExpenseType;
        //     if(!(expenseType in groupedExpenses)){
        //         groupedExpenses[expenseType] = [];
        //     }
        //     groupedExpenses[expenseType].push(expense);
        // })
        
    }
    catch (error) {
        console.error("Error retrieving expense: ", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});