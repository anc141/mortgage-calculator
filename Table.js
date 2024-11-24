import React from 'react';

export default ({ payments, className }) => {
  let output = payments
    .filter((yr, i) => i > 0 && (yr.balance > 0 || yr.interestyrly > 0))
    .reduce(
      (acc, yr, index) => ({
        interestTotal: acc.interestTotal + yr.interestyrly,
        overpaymentTotal: acc.overpaymentTotal + yr.overpayment,
        rows: [
          ...acc.rows,
          [
            yr.partial ? yr.partial + 'm' : index + 1,
            Math.round(yr.interestyrly || 0),
            Math.round(yr.overpayment),
            Math.round(yr.balance)
          ]
        ]
      }),
      { interestTotal: 0, overpaymentTotal: 0, rows: [] }
    );

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>Years</th>
          <th>Interest</th>
          <th>Overpayment</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {output.rows.map((row, index) => (
          <tr key={index}>
            {row.map((d, i) => (
              <td key={i}>{d.toLocaleString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            {Math.round(output.interestTotal).toLocaleString()}
          </td>
          <td>{Math.round(output.overpaymentTotal).toLocaleString()}</td>
          <td />
        </tr>
      </tfoot>
    </table>
  );
};
