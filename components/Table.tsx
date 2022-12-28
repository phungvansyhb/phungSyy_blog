import React from "react";

type Props<T extends { [key: string]: any }> = {
    data: T[];
    columns: {
        index: string;
        title: string;
        render?: (index: number, record: T) => React.ReactNode;
        align?: "start" | "center" | "left";
    }[];
    loading?: boolean;
};

export default function Table<T extends { [key: string]: any }>({
    columns,
    data,
    loading,
}: Props<T>) {
    return (
        <div className="m-4 rounded-lg border overflow-hidden">
            {loading ? (
                "loading"
            ) : (
                <table className="table-auto  rounded-lg w-full ">
                    <thead className="bg-gray-200 font-bold capitalize">
                        <tr>
                            {columns.map((header, index) => (
                                <td key={index} className="py-2 text-center">
                                    {header.title}
                                </td>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((header, columnIndex) => {
                                    return header.render ? (
                                        header.render(rowIndex, item)
                                    ) : (
                                        <td
                                            key={columnIndex}
                                            className={
                                                (() => {
                                                    if (header.align === "left") return "text-end";
                                                    else if (header.align === "center")
                                                        return "text-center";
                                                    else return "text-start";
                                                })() + " py-2"
                                            }
                                        >
                                            {item[header.index]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
