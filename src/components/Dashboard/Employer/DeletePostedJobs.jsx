"use client";

import { DeleteEmployerPostedJobs } from "@/lib/api/employer/data";
import { showToast } from "@/Util/toast";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeletePostedJobs({ job }) {
    const router = useRouter()

    const handleDelete = async (id) => {
        try {
            const result = await DeleteEmployerPostedJobs(id)
            if (result.success) {
                showToast.success('Delete Successful')
                router.refresh()
            } else {
                showToast.error('Delete Failed')
            }
        } catch (error) {
            console.log(error)
            showToast.error('something went Wrong!')
        }
    }

    return (
        <AlertDialog>
            <AlertDialog.Trigger >
                <button className="flex-1 w-full flex items-center justify-center gap-2 rounded-xl border border-rose-200 py-3 text-xs uppercase tracking-wider font-bold text-rose-600 bg-rose-50/30 transition-all duration-300 hover:bg-rose-50 hover:border-rose-300 active:scale-[0.98]"> <Trash2 size={14} strokeWidth={2.5} /> Delete </button>
            </AlertDialog.Trigger>
            <AlertDialog.Backdrop className="bg-[#2c221e]/40 backdrop-blur-md">
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px] border border-[#dfcbaf] bg-[#ebdcc9] text-[#2c221e] rounded-3xl p-2 shadow-xl">
                        <AlertDialog.CloseTrigger className="hover:bg-[#2c221e]/10 text-[#2c221e]" />
                        
                        <AlertDialog.Header className="flex flex-col gap-1 pt-6 px-6 border-none">
                            <AlertDialog.Icon status="danger" className="text-rose-600 bg-rose-50/50" />
                            <AlertDialog.Heading className="text-xl font-black tracking-tight text-[#2c221e] mt-2">
                                Delete Job permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        
                        <AlertDialog.Body className="py-2 px-6 text-sm font-medium text-[#4a3b35]/90 leading-relaxed">
                            <p>
                                This will permanently delete <strong>{job?.title || "this job posting"}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        
                        <AlertDialog.Footer className="pb-6 px-6  gap-3 border-none flex justify-end mt-4">
                            <Button 
                                slot="close" 
                                variant="tertiary"
                                className="py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border border-[#dfcbaf] text-[#2c221e] bg-transparent hover:bg-[#2c221e]/5 transition h-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleDelete(job._id)}
                                type="submit"
                                slot="close" 
                                variant="danger"
                                className="py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition h-auto"
                            >
                                Delete Job
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}