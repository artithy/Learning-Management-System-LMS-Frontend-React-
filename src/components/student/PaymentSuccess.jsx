import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import getAxios from "../../../utils/axios";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const invoice = queryParams.get("invoice");
    const course_id = queryParams.get("course_id");
    const student_id = queryParams.get("student_id");

    useEffect(() => {
        const verifyPayment = async () => {
            if (!invoice || !course_id || !student_id) {
                console.warn("Debug: Missing parameters");
                setResult({
                    status: false,
                    message: "Missing parameters. Cannot verify payment",
                });
                setLoading(false);
                return;
            }

            try {
                const axiosInstance = getAxios();
                console.log("Debug: Sending GET request to verify payment...");
                const res = await axiosInstance.get(
                    `/verify-payment?invoice=${invoice}&course_id=${course_id}&student_id=${student_id}`
                );

                console.log("Debug: Response from server ->", res.data);
                setResult(res.data);
            } catch (err) {
                console.error("Debug: Error verifying payment ->", err);
                setResult({
                    status: false,
                    message: "Something went wrong verifying payment",
                });
            } finally {
                setLoading(false);
                console.log("Debug: Loading finished");
            }
        };

        verifyPayment();
    }, [invoice, course_id, student_id]);

    const handleBackHome = () => {
        navigate("/student/dashboard");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-blue-50">
                <div className="text-center text-gray-600 text-lg animate-pulse">
                    Verifying your payment...
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h1
                    className={`text-2xl font-bold mb-3 ${result?.status ? "text-blue-700" : "text-red-600"}`}
                >
                    {result?.status ? "Payment Successful!" : "Payment Failed!"}
                </h1>

                <p className="text-gray-600 mb-4">
                    {result?.message || "Thank you for your payment."}
                </p>

                {result?.order_id && (
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                        Order Id: <span className="text-blue-600">{result.order_id}</span>
                    </p>
                )}

                {result?.invoice_id && (
                    <p className="text-lg font-semibold text-gray-800 mb-4">
                        Invoice Id: <span className="text-blue-600">{result.invoice_id}</span>
                    </p>
                )}

                <button
                    onClick={handleBackHome}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}
