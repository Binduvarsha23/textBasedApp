import React from 'react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'bn', name: 'Bengali' },
    { code: 'mr', name: 'Marathi' },
    { code: 'pa', name: 'Punjabi' }
];

function Countries({ inputLang, setInputLang, outputLang, setOutputLang }) {
    return (
        <nav >
            <div className="container-fluid">
                <div className="d-flex">
                    <div className="mx-2">
                        <label className='my-2'>Select Input Language: </label>
                        <select
                            value={inputLang}
                            onChange={(e) => setInputLang(e.target.value)}
                            className="form-select"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mx-2">
                        <label className='my-2'>Select Output Language: </label>
                        <select
                            value={outputLang}
                            onChange={(e) => setOutputLang(e.target.value)}
                            className="form-select"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Countries;
