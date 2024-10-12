import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';
import jsPDF from 'jspdf'; // For PDF generation
import { Document, Packer, Paragraph, TextRun } from 'docx'; // For DOCX generation

function TextForm(props) {
    const [text, setText] = useState('Enter text here');
    const [translatedText, setTranslatedText] = useState('');
    const [inputLang, setInputLang] = useState('en'); // Default to English
    const [outputLang, setOutputLang] = useState('hi'); // Default to Hindi
    const [countryCode, setCountryCode] = useState('IN'); // Default to India
    const [history, setHistory] = useState(['Enter text here']); // Track changes

    useEffect(() => {
        if (text !== history[history.length - 1]) {
            setHistory((prevHistory) => [...prevHistory, text]);
        }
    }, [text]);

    // Function to convert selected text or entire text to uppercase
    const handleUpClick = () => {
        const textarea = document.getElementById('myBox');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (text.trim().length === 0) return; // Check if there's text

        if (start === end) { // No selection, apply to the whole text
            setText(text.toUpperCase());
        } else { // Selection exists, apply only to selected text
            const selectedText = text.substring(start, end).toUpperCase();
            const updatedText = text.substring(0, start) + selectedText + text.substring(end);
            setText(updatedText);
        }
        props.showAlert("Converted to upper case", "success");
    };

    // Function to convert selected text or entire text to lowercase
    const handleLClick = () => {
        const textarea = document.getElementById('myBox');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (text.trim().length === 0) return; // Check if there's text

        if (start === end) { // No selection, apply to the whole text
            setText(text.toLowerCase());
        } else { // Selection exists, apply only to selected text
            const selectedText = text.substring(start, end).toLowerCase();
            const updatedText = text.substring(0, start) + selectedText + text.substring(end);
            setText(updatedText);
        }
        props.showAlert("Converted to lower case", "success");
    };

    // Function to remove extra spaces
    const handleExtraSpaces = () => {
        const trimmedText = text.replace(/\s+/g, ' ').trim(); // Remove extra spaces
        if (text !== trimmedText) {
            setText(trimmedText);
            props.showAlert("Extra spaces removed", "success");
        } else {
            props.showAlert("No extra spaces to remove", "info");
        }
    };

    // Function to clear the text
    const handleClear = () => {
        if (text.trim().length === 0) return; // Check if there's text
        setText("");
        props.showAlert("All cleared", "success");
    };

    // Function to copy the text to the clipboard with HTML formatting
    const handleCopy = async () => {
        if (text.trim().length === 0) return; // Check if there's text

        try {
            await navigator.clipboard.writeText(text);
            props.showAlert("Copied to clipboard", "success");
        } catch (error) {
            console.error('Copy failed:', error);
            props.showAlert("Failed to copy", "error");
        }
    };

    // Function to handle undo
    const handleUndo = () => {
        if (history.length > 1) {
            const lastState = history[history.length - 2]; // Get the previous state
            setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove current state from history
            setText(lastState); // Restore to previous state
            props.showAlert("Undo successful!", "success");
        } else {
            props.showAlert("Nothing to undo", "info");
        }
    };

    // Function to download as PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(10, 10, text.replace(/<\/?[^>]+(>|$)/g, "")); // Remove HTML tags
        doc.save('document.pdf');
    };

    // Function to download as DOCX
    const handleDownloadDOCX = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: text.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
                                    bold: true
                                })
                            ]
                        })
                    ]
                }
            ]
        });

        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'document.docx';
        link.click();
    };

    // Function to handle text translation
    const handleTranslate = async () => {
        const options = {
            method: 'POST',
            url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/html',
            headers: {
                'x-rapidapi-key': '98ffcd1e0dmsh9809eab2f6be6b8p12c460jsn6c098faf12f6', // Replace with your API key
                'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
            data: {
                from: inputLang,
                to: outputLang,
                html: `<p>${text}</p>`, // Ensure the input is properly formatted HTML
            },
        };

        try {
            const response = await axios.request(options);
            setTranslatedText(response.data.trans);
        } catch (error) {
            console.error(error);
            setTranslatedText("Error occurred during translation");
        }
    };

    // Function to handle sharing via Web Share API
    const handleShare = async () => {
        const doc = new jsPDF();
        doc.text(10, 10, text.replace(/<\/?[^>]+(>|$)/g, "")); // Create PDF
        const pdfBlob = doc.output('blob');
        const file = new File([pdfBlob], 'document.pdf', { type: 'application/pdf' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: 'Shared Document',
                    text: 'Check out this document!',
                    files: [file], // You can share DOCX as well
                });
            } catch (error) {
                console.error('Error sharing document:', error);
                alert('Failed to share document.');
            }
        } else {
            alert('Sharing is not supported on this device.');
        }
    };

    // Count words in text
    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    return (
        <>
            {/* Countries Component to select country code and languages */}
            <Countries
                inputLang={inputLang}
                setInputLang={setInputLang}
                outputLang={outputLang}
                setOutputLang={setOutputLang}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
            />

            {/* Text Form Section */}
            <div className='container'>
                <div className="mb-3">
                    <h1>{props.heading}</h1>
                    <textarea
                        className="form-control"
                        value={text}
                        id="myBox"
                        rows="8"
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                {/* Button Container */}
                <div className="button-container">
                    <button className="btn btn-primary mx-2 my-2" onClick={handleUpClick}
                    title='selective conversion also there, try it!'>UpperCase</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleLClick}
                     title='selective conversion also there, try it!'>LowerCase</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleClear}>Clear</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleDownloadPDF}>Download PDF</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleDownloadDOCX}>Download DOCX</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleTranslate}>Translate</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleUndo}>Undo</button>
                    <button className="btn btn-primary mx-2 my-2" onClick={handleShare}>Share</button>
                </div>
            </div>

            {/* Text summary */}
            <div className="container my-3">
                <h2>Your text summary</h2>
                <p>{countWords(text)} words and {text.length} characters</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Enter something to preview'}</p>
                <h2>Translated Text</h2>
                <div dangerouslySetInnerHTML={{ __html: translatedText }}></div> {/* Safely render translated HTML */}
            </div>
        </>
    );
}

export default TextForm;
