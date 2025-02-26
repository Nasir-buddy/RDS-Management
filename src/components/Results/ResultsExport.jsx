import React from 'react';

const ResultsExport = ({ results }) => {
    // Function to download the results as a CSV file
    const downloadResults = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + results.map(result => 
                `${result.test_num},${result.type},${result.break_point},${result.recovery_point},${result.time}`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `vergence_test_results_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex justify-center mt-4">
            <button 
                onClick={downloadResults} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Export Results
            </button>
        </div>
    );
};

export default ResultsExport;