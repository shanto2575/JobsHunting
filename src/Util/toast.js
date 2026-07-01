import toast from "react-hot-toast";

export const showToast = {
    success: (message) => {
        toast.success(message, {
            style: {
                border: '1.5px solid rgba(44, 34, 30, 0.15)', 
                padding: '14px 20px',
                color: '#007C00', 
                background: '#f4eae1',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '14px',
                boxShadow: '0 10px 25px -5px rgba(44, 34, 30, 0.06)',
            },
            iconTheme: {
                primary: '#007C00',
                secondary: '#f4eae1',
            },
        });
    },

    error: (message) => {
        toast.error(message, {
            style: {
                border: '1.5px solid rgba(178, 59, 59, 0.2)', 
                padding: '14px 20px',
                color: '#5a2323', 
                background: '#fcf4f2', 
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '14px',
                boxShadow: '0 10px 25px -5px rgba(44, 34, 30, 0.06)',
            },
            iconTheme: {
                primary: '#b23b3b', 
                secondary: '#fcf4f2',
            },
        });
    }
};