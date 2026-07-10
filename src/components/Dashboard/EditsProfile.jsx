"use client";

import { useForm } from "react-hook-form";
import { EditsProfiles } from "@/lib/api/seeker/action";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { Edit } from "lucide-react";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function EditsProfile({ user }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            image: user?.image || "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        const result = await EditsProfiles(user.id, data);
        console.log(result);
        
        if (result.success) {
            await authClient.getSession({
                query: {
                    disableCookieCache: true,
                },
            });
            window.location.reload();
            showToast.success("Profile Updated Successfully");
        } else {
            showToast.error('Profile Updated Failed');
        }
    };

    return (
        <Modal>
            <Modal.Trigger>
                {/* Edit Profile Open Button - Soft Neumorphic Style */}
                <Button
                    className="px-6 py-3.5 rounded-2xl bg-[#ded1c0] text-[#2c221e] font-black text-xs uppercase tracking-wider shadow-[4px_4px_10px_rgba(207,200,191,0.5),-4px_-4px_10px_#ffffff] hover:shadow-[inset_3px_3px_6px_rgba(207,200,191,0.4),inset_-3px_-3px_6px_#ffffff] active:scale-95 transition-all duration-200 border border-[#ebdcc9]/30"
                >
                    Edit Profile
                </Button>
            </Modal.Trigger>

            <Modal.Backdrop className="bg-[#2c221e]/30 backdrop-blur-md">
                <Modal.Container placement="auto">
                    {/* Main Dialog Container with Warm Theme and Soft Shadows */}
                    <Modal.Dialog className="sm:max-w-md bg-[#f4ece1] rounded-[2.5rem] border border-[#ebdcc9]/40 shadow-[20px_20px_50px_rgba(207,200,191,0.5),-20px_-20px_50px_0.1] overflow-hidden p-2">
                        
                        <Modal.CloseTrigger className="text-[#2c221e]/60 hover:text-[#2c221e] transition-colors p-2 top-4 right-4" />

                        {/* Header Section */}
                        <Modal.Header className="flex items-center gap-3 pt-6 px-6 pb-4 border-b border-[#ebdcc9]/60">
                            <div className="p-2.5 bg-[#f4ece1] text-[#2c221e] rounded-xl shadow-[inset_2px_2px_5px_rgba(207,200,191,0.4),inset_-2px_-2px_5px_#ffffff] border border-[#ebdcc9]/20">
                                <Edit className="size-5" />
                            </div>
                            <div>
                                <Modal.Heading className="text-xl font-black text-[#2c221e] tracking-tight">
                                    Edit Profile
                                </Modal.Heading>
                                <p className="text-[11px] text-gray-500 font-medium mt-0.5">Update your account identity</p>
                            </div>
                        </Modal.Header>

                        {/* Body / Form Section */}
                        <Modal.Body className="p-6">
                            <Surface className="bg-transparent shadow-none p-0">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-6"
                                >
                                    {/* Name Input Field */}
                                    <TextField className="flex flex-col gap-2">
                                        <Label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/70 px-1">
                                            Name
                                        </Label>
                                        <Input
                                            placeholder="Enter your name"
                                            className="w-full rounded-2xl bg-[#f4ece1] px-4 py-3.5 text-sm text-[#2c221e] font-medium border border-[#ebdcc9]/40 outline-none transition-all duration-200 shadow-[inset_3px_3px_6px_rgba(207,200,191,0.4),inset_-3px_-3px_6px_#ffffff] focus:border-[#2c221e]/30 placeholder:text-gray-400"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs font-semibold mt-1 px-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </TextField>

                                    {/* Image URL Input Field */}
                                    <TextField className="flex flex-col gap-2">
                                        <Label className="text-xs font-black uppercase tracking-wider text-[#2c221e]/70 px-1">
                                            Profile Image URL
                                        </Label>
                                        <Input
                                            placeholder="Enter image url"
                                            className="w-full rounded-2xl bg-[#f4ece1] px-4 py-3.5 text-sm text-[#2c221e] font-medium border border-[#ebdcc9]/40 outline-none transition-all duration-200 shadow-[inset_3px_3px_6px_rgba(207,200,191,0.4),inset_-3px_-3px_6px_#ffffff] focus:border-[#2c221e]/30 placeholder:text-gray-400"
                                            {...register("image")}
                                        />
                                    </TextField>

                                    {/* Footer Action Buttons */}
                                    <Modal.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-[#ebdcc9]/40 mt-2">
                                        {/* Cancel Button */}
                                        <Button
                                            slot="close"
                                            variant="secondary"
                                            className="px-5 py-3 rounded-xl bg-[#f4ece1] text-gray-600 font-bold text-xs uppercase tracking-wider border border-[#ebdcc9]/40 shadow-[3px_3px_6px_rgba(207,200,191,0.3),-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(207,200,191,0.3),inset_-2px_-2px_4px_#ffffff] transition-all duration-200"
                                        >
                                            Cancel
                                        </Button>

                                        {/* Save Button (Dark Brown Accent) */}
                                        <Button
                                            type="submit"
                                            slot={ "close"}
                                            isDisabled={isSubmitting}
                                            className="px-6 py-3 rounded-xl bg-[#2c221e] text-[#ebdcc9] font-black text-xs uppercase tracking-wider shadow-[3px_3px_8px_rgba(44,34,30,0.2)] hover:bg-[#3d302a] active:scale-95 disabled:opacity-50 transition-all duration-200"
                                        >
                                            {isSubmitting ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}