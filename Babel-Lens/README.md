# 🌍 Babel Lens

**Instantly translate code comments into 40+ languages directly in VS Code!**

Break down language barriers in your coding journey. Whether you're working with international teams, contributing to open-source projects, or learning from code written in different languages, this extension makes every comment accessible.

![Extension Demo](https://img.shields.io/badge/VS%20Code-Extension-blue?style=for-the-badge&logo=visual-studio-code)
![Languages](https://img.shields.io/badge/40%2B-Languages-green?style=for-the-badge)
![Free](https://img.shields.io/badge/100%25-Free-orange?style=for-the-badge)

## ✨ Features

### 🎯 **Smart Comment Detection**
- Automatically detects comments in any programming language
- Supports multiple comment styles: `//`, `#`, `/* */`
- Works with all file types: JavaScript, Python, Java, C++, HTML, CSS, and more

### 🌐 **40+ Languages Supported**
Choose from a comprehensive list of languages including:
- **European**: Spanish, French, German, Italian, Portuguese, Russian, Dutch, Swedish, Norwegian
- **Asian**: Chinese, Japanese, Korean, Thai, Vietnamese, Indonesian, Malay
- **Indian**: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu
- **Middle Eastern**: Arabic, Hebrew, Turkish
- **And many more!**

### 🔄 **Multiple Translation Options**
After translation, choose what to do:
- **📋 Copy Translation** - Copy to clipboard for easy sharing
- **🔄 Replace Comment** - Replace original with translation
- **➕ Insert Below** - Add translation as new comment line (preserves original)

### ⚡ **Batch Processing**
- **Translate All Comments** - Process entire files at once
- Intelligent duplicate detection - won't re-translate existing translations
- Language labels for easy identification: `[Spanish]`, `[Hindi]`, etc.

### 🎨 **Seamless Integration**
- **CodeLens Integration** - Click "🌍 Translate" directly on comment lines
- **Context Menu** - Right-click access to batch translation
- **Command Palette** - Quick access via `Ctrl+Shift+P`

## 🚀 Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Babel Lens"
4. Click Install
5. Start translating immediately!

## 📖 How to Use

### 🎯 **Translate Individual Comments**

1. **Open any code file** with comments
2. **Look for the "🌍 Translate" CodeLens** above each comment
3. **Click on it** to open the language selection menu
4. **Choose your target language** from the dropdown
5. **Select an action**:
   - Copy translation to clipboard
   - Replace the original comment
   - Insert translation below original



### 📝 **Translate All Comments**

**Method 1: Context Menu**
1. Right-click anywhere in your code file
2. Select "Translate All Comments"
3. Choose your target language
4. Watch as all comments get translated!

**Method 2: Command Palette**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Comment Translator: Translate All Comments"
3. Select your language
4. All comments are translated instantly!

### 💡 **Example Usage**

**Before:**
```javascript
// Calculate fibonacci sequence recursively
function fibonacci(n) {
    // Base case for recursion
    if (n <= 1) {
        return n;
    }
    // Recursive call
    return fibonacci(n-1) + fibonacci(n-2);
}
```

**After (with Spanish translation):**
```javascript
// Calculate fibonacci sequence recursively
// [Spanish] Calcular la secuencia de fibonacci recursivamente
function fibonacci(n) {
    // Base case for recursion
    // [Spanish] Caso base para la recursión
    if (n <= 1) {
        return n;
    }
    // Recursive call
    // [Spanish] Llamada recursiva
    return fibonacci(n-1) + fibonacci(n-2);
}
```

## 🌟 Benefits

### 👥 **For International Teams**
- **Bridge Communication Gaps** - Understand comments written by team members in different languages
- **Inclusive Collaboration** - Make your code accessible to developers worldwide
- **Cultural Exchange** - Learn technical terms in different languages

### 🎓 **For Learning & Development**
- **Study Open Source** - Understand comments in foreign repositories
- **Language Learning** - See technical translations in context
- **Code Comprehension** - Break down language barriers when learning from others

### 💼 **For Professional Work**
- **Code Reviews** - Understand comments regardless of author's language
- **Legacy Code** - Translate old comments to current team language
- **Documentation** - Create multilingual documentation from code comments
- **Client Projects** - Work with codebases from international clients

### 🔓 **For Open Source**
- **Global Contribution** - Contribute to projects in any language
- **Accessibility** - Make your projects welcoming to international contributors
- **Knowledge Sharing** - Help others understand your code regardless of language

## 🛠️ Technical Details

### **Supported Comment Styles**
- `// Single line comments` (JavaScript, C++, Java, C#, etc.)
- `# Hash comments` (Python, Shell, Ruby, YAML, etc.)
- `/* Block comments */` (CSS, JavaScript, C, etc.)

### **File Type Support**
Works with any file type VS Code can open:
- Programming languages: `.js`, `.py`, `.java`, `.cpp`, `.cs`, `.php`, `.go`, `.rs`
- Web technologies: `.html`, `.css`, `.scss`, `.vue`, `.react`
- Configuration: `.json`, `.yaml`, `.xml`, `.toml`
- Scripts: `.sh`, `.bat`, `.ps1`
- And many more!

### **Translation Service**
- Uses **MyMemory API** - free and reliable translation service
- **No API keys required** - works out of the box
- **Privacy-focused** - translations are not stored or logged
- **Rate limiting built-in** - respectful API usage

## 🚀 Performance

- **Lightning Fast** - Translations appear in seconds
- **Lightweight** - Minimal impact on VS Code performance
- **Offline Friendly** - Only requires internet for translation requests
- **Smart Caching** - Avoids duplicate translations

## 🔧 Configuration

No configuration needed! The extension works perfectly out of the box.

**Optional Settings** (coming soon):
- Default target language
- Custom translation services
- Keyboard shortcuts

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** - Found an issue? Let us know!
2. **Request Features** - Have ideas? We'd love to hear them!
3. **Add Languages** - Help us support more languages
4. **Improve Translations** - Suggest better translation services

## 📋 Roadmap

- [ ] **Custom Translation Services** - Add support for Google Translate, Azure Translator
- [ ] **Offline Translation** - Local translation models
- [ ] **Translation History** - Keep track of translated comments
- [ ] **Team Settings** - Shared translation preferences
- [ ] **Auto-detection** - Automatically detect comment language
- [ ] **Batch Export** - Export translations to files

## 🐛 Troubleshooting

### **Translation Not Working?**
1. Check your internet connection
2. Ensure the comment text is not empty
3. Try a different target language

### **CodeLens Not Appearing?**
1. Make sure the file contains recognizable comments (`//`, `#`, `/* */`)
2. Restart VS Code if needed
3. Check that the extension is enabled

### **Performance Issues?**
1. Use "Translate All Comments" sparingly on very large files
2. The extension includes built-in rate limiting for API calls

## 📄 License

This extension is free and open-source. Feel free to use it in personal and commercial projects.

## 💝 Support

If you find this extension helpful:
- ⭐ **Star this repository**
- 📝 **Leave a review** on the VS Code Marketplace
- 🐛 **Report issues** to help us improve
- 💡 **Suggest features** for future releases

## 🔗 Links

- **VS Code Marketplace**: [Install Extension](https://marketplace.visualstudio.com/items?itemName=Kathit-dev.babel-lens)
- **GitHub Repository**: [Source Code](https://github.com/Kathitjoshi/Babel-Lens)
- **Report Issues**: [Bug Reports](https://github.com/Kathitjoshi/Babel-Lens/issues)
- **Feature Requests**: [Suggestions](https://github.com/Kathitjoshi/Babel-Lens/discussions)

---

**Made with ❤️ for the global developer community**

*Break down language barriers, one comment at a time!* 🌍