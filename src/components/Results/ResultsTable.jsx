
import React from 'react';
import PropTypes from 'prop-types';

const ResultsTable = ({ results }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        <th className="py-2 px-4 border-b">Test #</th>
                        <th className="py-2 px-4 border-b">Test Type</th>
                        <th className="py-2 px-4 border-b">Break Point (arcsec)</th>
                        <th className="py-2 px-4 border-b">Recovery Point (arcsec)</th>
                        <th className="py-2 px-4 border-b">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-100 text-black">
                            <td className="py-2 px-4 border-b">{result.test_num}</td>
                            <td className="py-2 px-4 border-b">{result.type}</td>
                            <td className="py-2 px-4 border-b">{result.break_point}</td>
                            <td className="py-2 px-4 border-b">{result.recovery_point}</td>
                            <td className="py-2 px-4 border-b">{result.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ResultsTable.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            test_num: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            break_point: PropTypes.string.isRequired,
            recovery_point: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ResultsTable;