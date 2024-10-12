import React from 'react';

export default function About(props) {
    return (
        <div className={`container bg-${props.mode}`}>
            <h1 className='my-3'>About TextUtils</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            What is TextUtils?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>TextUtils</strong> is a versatile text manipulation tool that allows users to perform various text-related operations like case conversion, text formatting, extra space removal, and even text translation across different languages. It also supports the generation of PDFs and DOCX files, making it a powerful text processing utility.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Key Features
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Some of the key features of TextUtils include:
                            <ul>
                                <li>Convert text to Uppercase or Lowercase and selective conversion also available.</li>
                                <li>Remove extra spaces in a given text.</li>
                                <li>Copy text to clipboard with one click.</li>
                                <li>Generate downloadable PDFs and DOCX files.</li>
                                <li>Translate text into multiple languages.</li>
                                <li>Undo last changes and restore previous versions of text.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            How does it work?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            TextUtils is built using modern web technologies like React, Axios for API requests, jsPDF for PDF generation, and Docx for DOCX creation. With a simple and user-friendly interface, anyone can use this tool for quick text formatting and manipulation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}