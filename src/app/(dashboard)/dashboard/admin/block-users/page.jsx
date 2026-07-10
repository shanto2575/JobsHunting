import BlockedUsersTable from "@/components/Dashboard/admin/BlockedUsersTable";
import { BlockData } from "@/lib/api/admin/data";

const BlockUserPage = async () => {
    const block = await BlockData();
    // console.log(block)

    return (
        <div className="p-6 space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-[#2c221e]">
                    Blocked Users
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage all blocked users.
                </p>

            </div>

            <BlockedUsersTable users={block} />

        </div>
    );
};

export default BlockUserPage;