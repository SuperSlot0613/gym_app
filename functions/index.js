var express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const fs = require("fs");

const port = 4420;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDLBxtU4MLz1qBX36IL2cfq56ca8coOiCU");

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run(image) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const prompt =`Identify the food name and there nutritional information. 
  give response in this format 
  {
    "image_analysis": {
      "image_id": "image123",
      "detected_foods": [
        {
          "name": "food_name",
          "position": "location",
          "category": "varient",
          "nutritional_info": {
            "calories": 52,
            "protein": 0.3,
            "carbohydrates": 14,
            "fats": 0.2,
            "fiber": 2.4,
            "sugars": 10
          }
        },
      ]
    }
  }`

  // const imageParts = [
  //   fileToGenerativePart("image1.png", "image/png"),
  //   fileToGenerativePart("image2.jpeg", "image/jpeg"),
  // ];
  mimeType="image/jpeg"

  imageParts=[{inlineData: {
    data: image.base64,
    mimeType
  }},]

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return response
}

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Hello world")
});

app.get("/imagecheck", (req, res) => {
  // console.log(req.body)
  response=run(req.body)
  res.send(response);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
