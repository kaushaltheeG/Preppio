"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const interview_1 = __importDefault(require("./routes/interview"));
const googledrive_1 = __importDefault(require("./routes/googledrive"));
const supabase_js_1 = require("@supabase/supabase-js");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app routes
app.use('/api/interview', (0, interview_1.default)(supabase));
app.use('/api/googledrive', (0, googledrive_1.default)(supabase));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
