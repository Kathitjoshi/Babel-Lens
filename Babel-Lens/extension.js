// Babel Lens Extension for Visual Studio Code
// This extension allows users to translate comments in their code files
// using a simple CodeLens interface and MyMemory translation API.

 // Features:
// 1. CodeLens for translating comments in various programming languages
// 2. Supports multiple languages for translation
// 3. Options to copy translation, replace comment, or insert below
// 4. Batch translation of all comments in the file
// 5. Uses MyMemory API for reliable translations
// 6. Handles different comment styles (//, #, /* */) across languages
// 7. Provides user-friendly prompts and notifications
// 8. Includes error handling for network issues and API errors

// Benefits:
// - Enhances code readability for non-native speakers
// - Saves time by automating comment translation
// - Supports a wide range of languages
// - Easy to use with a simple interface
// - Helps teams collaborate across language barriers

// Usage:
// 1. Install the extension in Visual Studio Code
// 2. Open a code file with comments
// 3. Hover over a comment to see the "🌍 Translate" CodeLens
// 4. Click the CodeLens to select a target language for translation
// 5. Choose from the list of supported languages
// 6. View the translated comment in a popup with options to copy, replace, or insert
// 7. Use the command palette to translate all comments in the file
// 8. Enjoy seamless translation of comments in your code!

// SPDX-License-Identifier: MIT

// Free and open-source software

// Made with ❤️ by Kathit Joshi

// Babel Lens Extension for Visual Studio Code

const vscode = require("vscode");
const https = require("https");

// Supported languages for translation
const LANGUAGES = {
  "Hindi": "hi",
  "Spanish": "es", 
  "French": "fr",
  "German": "de",
  "Italian": "it",
  "Portuguese": "pt",
  "Russian": "ru",
  "Japanese": "ja",
  "Korean": "ko",
  "Chinese (Simplified)": "zh-cn",
  "Arabic": "ar",
  "Dutch": "nl",
  "Swedish": "sv",
  "Norwegian": "no",
  "Danish": "da",
  "Finnish": "fi",
  "Greek": "el",
  "Turkish": "tr",
  "Polish": "pl",
  "Czech": "cs",
  "Hungarian": "hu",
  "Romanian": "ro",
  "Bulgarian": "bg",
  "Croatian": "hr",
  "Slovak": "sk",
  "Slovenian": "sl",
  "Estonian": "et",
  "Latvian": "lv",
  "Lithuanian": "lt",
  "Thai": "th",
  "Vietnamese": "vi",
  "Indonesian": "id",
  "Malay": "ms",
  "Filipino": "tl",
  "Hebrew": "he",
  "Ukrainian": "uk",
  "Bengali": "bn",
  "Tamil": "ta",
  "Telugu": "te",
  "Marathi": "mr",
  "Gujarati": "gu",
  "Kannada": "kn",
  "Malayalam": "ml",
  "Punjabi": "pa",
  "Urdu": "ur"
};

function activate(context) {
  console.log("✅ Babel Lens Extension is now active");

  // Register CodeLens provider
  const codeLensProvider = vscode.languages.registerCodeLensProvider("*", {
    provideCodeLenses(document) {
      const lenses = [];

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const trimmed = line.text.trim();

        // Check for comments (// for most languages, # for Python, etc.)
        if (trimmed.startsWith("//") || trimmed.startsWith("#") || 
            (trimmed.startsWith("/*") && trimmed.endsWith("*/"))) {
          lenses.push(
            new vscode.CodeLens(line.range, {
              title: "🌍 Translate",
              command: "commentTranslator.translateComment",
              arguments: [i] // Pass line number as argument
            })
          );
        }
      }

      return lenses;
    }
  });

  // Register command to handle translation
  const translateCommand = vscode.commands.registerCommand(
    "commentTranslator.translateComment",
    async (lineNumber) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      const line = editor.document.lineAt(lineNumber);
      let comment = line.text.trim();
      
      // Extract comment text based on comment type
      if (comment.startsWith("//")) {
        comment = comment.replace("//", "").trim();
      } else if (comment.startsWith("#")) {
        comment = comment.replace("#", "").trim();
      } else if (comment.startsWith("/*") && comment.endsWith("*/")) {
        comment = comment.replace("/*", "").replace("*/", "").trim();
      }

      if (!comment) {
        vscode.window.showWarningMessage("No comment text found to translate");
        return;
      }

      // Show language selection menu
      const languageNames = Object.keys(LANGUAGES);
      const selectedLanguage = await vscode.window.showQuickPick(languageNames, {
        placeHolder: "Select target language for translation",
        title: "Choose Translation Language"
      });

      if (!selectedLanguage) {
        return; // User cancelled
      }

      const targetLangCode = LANGUAGES[selectedLanguage];

      try {
        vscode.window.showInformationMessage(`🔄 Translating to ${selectedLanguage}...`);
        
        const translatedText = await translateText(comment, "en", targetLangCode);
        
        // Show translation in a popup with more options
        const action = await vscode.window.showInformationMessage(
          `💬 ${selectedLanguage}: ${translatedText}`,
          "Copy Translation",
          "Replace Comment",
          "Insert Below"
        );

        if (action === "Copy Translation") {
          vscode.env.clipboard.writeText(translatedText);
          vscode.window.showInformationMessage("Translation copied to clipboard!");
        } else if (action === "Replace Comment") {
          await replaceComment(editor, lineNumber, translatedText);
        } else if (action === "Insert Below") {
          await insertTranslationBelow(editor, lineNumber, translatedText, selectedLanguage);
        }

      } catch (err) {
        console.error("❌ Translation failed:", err);
        vscode.window.showErrorMessage(`Translation failed: ${err.message}`);
      }
    }
  );

  // Register additional commands for batch translation
  const translateAllCommand = vscode.commands.registerCommand(
    "commentTranslator.translateAllComments",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      // Show language selection menu
      const languageNames = Object.keys(LANGUAGES);
      const selectedLanguage = await vscode.window.showQuickPick(languageNames, {
        placeHolder: "Select target language for translating all comments",
        title: "Choose Translation Language"
      });

      if (!selectedLanguage) {
        return;
      }

      const targetLangCode = LANGUAGES[selectedLanguage];
      await translateAllComments(editor, targetLangCode, selectedLanguage);
    }
  );

  // Add disposables to context
  context.subscriptions.push(codeLensProvider);
  context.subscriptions.push(translateCommand);
  context.subscriptions.push(translateAllCommand);
}

// Helper function to replace comment with translation
async function replaceComment(editor, lineNumber, translatedText) {
  const line = editor.document.lineAt(lineNumber);
  const lineText = line.text;
  
  let newText;
  if (lineText.trim().startsWith("//")) {
    const indent = lineText.match(/^\s*/)[0];
    newText = `${indent}// ${translatedText}`;
  } else if (lineText.trim().startsWith("#")) {
    const indent = lineText.match(/^\s*/)[0];
    newText = `${indent}# ${translatedText}`;
  } else if (lineText.trim().startsWith("/*") && lineText.trim().endsWith("*/")) {
    const indent = lineText.match(/^\s*/)[0];
    newText = `${indent}/* ${translatedText} */`;
  } else {
    newText = lineText; // fallback
  }

  await editor.edit(editBuilder => {
    editBuilder.replace(line.range, newText);
  });
  
  vscode.window.showInformationMessage("Comment replaced with translation!");
}

// Helper function to insert translation below the original comment
async function insertTranslationBelow(editor, lineNumber, translatedText, languageName) {
  const line = editor.document.lineAt(lineNumber);
  const lineText = line.text;
  const indent = lineText.match(/^\s*/)[0];
  
  let commentPrefix = "//";
  if (lineText.trim().startsWith("#")) {
    commentPrefix = "#";
  }
  
  const translationLine = `${indent}${commentPrefix} [${languageName}] ${translatedText}`;
  
  await editor.edit(editBuilder => {
    editBuilder.insert(new vscode.Position(lineNumber + 1, 0), translationLine + '\n');
  });
  
  vscode.window.showInformationMessage("Translation inserted below original comment!");
}

// Function to translate all comments in the file
async function translateAllComments(editor, targetLangCode, languageName) {
  const document = editor.document;
  const comments = [];
  
  // Find all comments
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i);
    const trimmed = line.text.trim();
    
    if (trimmed.startsWith("//") || trimmed.startsWith("#") || 
        (trimmed.startsWith("/*") && trimmed.endsWith("*/"))) {
      
      let comment = trimmed;
      if (comment.startsWith("//")) {
        comment = comment.replace("//", "").trim();
      } else if (comment.startsWith("#")) {
        comment = comment.replace("#", "").trim();
      } else if (comment.startsWith("/*") && comment.endsWith("*/")) {
        comment = comment.replace("/*", "").replace("*/", "").trim();
      }
      
      if (comment && !comment.startsWith(`[${languageName}]`)) { // Skip already translated comments
        comments.push({ lineNumber: i, text: comment });
      }
    }
  }
  
  if (comments.length === 0) {
    vscode.window.showInformationMessage("No comments found to translate");
    return;
  }
  
  vscode.window.showInformationMessage(`🔄 Translating ${comments.length} comments to ${languageName}...`);
  
  // Translate and insert all comments
  for (const commentInfo of comments) {
    try {
      const translatedText = await translateText(commentInfo.text, "en", targetLangCode);
      await insertTranslationBelow(editor, commentInfo.lineNumber, translatedText, languageName);
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to translate comment on line ${commentInfo.lineNumber}:`, error);
    }
  }
  
  vscode.window.showInformationMessage(`✅ Finished translating comments to ${languageName}!`);
}

// Translation function using MyMemory API (free and reliable)
async function translateText(text, fromLang, toLang) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.responseStatus === 200) {
            resolve(response.responseData.translatedText);
          } else {
            reject(new Error('Translation service returned an error'));
          }
        } catch (error) {
          reject(new Error('Failed to parse translation response'));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
  });
}

function deactivate() {
  console.log("Babel Lens Extension deactivated");
}

module.exports = {
  activate,
  deactivate
};