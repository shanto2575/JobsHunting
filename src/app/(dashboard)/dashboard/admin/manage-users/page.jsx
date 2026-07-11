import UsersTable from "@/components/Dashboard/admin/UsersTable";
import { UserData } from "@/lib/api/admin/data";

const ManageUsersPage = async () => {
    const users = await UserData();
    const data=users.result;
    
    return (
        <div className="p-6 space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-[#2c221e]">
                    Manage Users
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage all registered users.
                </p>
            </div>

            <UsersTable users={data} />

        </div>
    );
};

export default ManageUsersPage;