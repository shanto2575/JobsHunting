"use client";

import { useState } from "react";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { FileText, Send, CheckCircle2 } from "lucide-react";
import { showToast } from "@/Util/toast";
import { useRouter } from "next/navigation";

export function ApplyModal({ job, user }) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    // already applied check
    const alreadyApplied = job?.applicants?.some(
        (applicant) => applicant.email === user?.email
    );

    const submitApplication = async () => {
        try {
            if (alreadyApplied) {
                return showToast.error("You already applied for this job");
            }

            if (!cv) {
                return showToast.error("Please upload your CV");
            }

            // PDF validation
            if (cv.type !== "application/pdf") {
                return showToast.error("Only PDF files are allowed");
            }

            // optional size validation (max 5MB)
            if (cv.size > 5 * 1024 * 1024) {
                return showToast.error("CV must be less than 5MB");
            }

            setLoading(true);

            // Upload CV
            const formData = new FormData();
            formData.append("cv", cv);

            const uploadRes = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload-cv`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadData = await uploadRes.json();

            if (!uploadData.success) {
                return showToast.error("CV Upload Failed");
            }

            // Apply API
            const applicantData = {
                name,
                email,
                userId: user.id,
                cv: uploadData.cvUrl,
                cvPublicId: uploadData.cvPublicId,
                appliedAt: new Date(),
                status: "Pending",
            };

            const applyRes = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/apply/${job._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(applicantData),
                }
            );

            const result = await applyRes.json();

            if (result.success) {
                showToast.success("Application Submitted Successfully");
                router.refresh()
            } else {
                showToast.error("Application Failed");
            }
        } catch (error) {
            console.log(error);
            showToast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Modal.Trigger>
                <button
                    disabled={alreadyApplied}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-4 px-4 font-bold transition shadow-md
                        ${alreadyApplied
                            ? "bg-emerald-600 text-white cursor-not-allowed"
                            : "bg-[#2c221e] text-[#f8f3ea] hover:bg-[#3a2d28]"
                        }`}
                >
                    {alreadyApplied ? (
                        <>
                            <CheckCircle2 size={18} />
                            Applied
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Apply Now
                        </>
                    )}
                </button>
            </Modal.Trigger>

            {!alreadyApplied && (
                <Modal.Backdrop className="backdrop-blur-md bg-black/20 transition-all">
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-md rounded-3xl border border-[#d6c3a5] overflow-hidden bg-[#f8f3ea] shadow-2xl">

                            <Modal.CloseTrigger />

                            <Modal.Header className="bg-[#f3e7d4] p-6 text-[#2c221e] flex flex-col items-start">
                                <Modal.Icon className="bg-[#dfcbaf] text-[#2c221e] p-2 rounded-xl shadow-sm">
                                    <FileText className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading className="text-xl font-black mt-3">
                                    Apply for Job
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface className="bg-transparent shadow-none border-0 p-0">
                                    <form className="flex flex-col gap-5">

                                        <TextField>
                                            <Label>Full Name</Label>
                                            <Input
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </TextField>

                                        <TextField>
                                            <Label>Email</Label>
                                            <Input
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </TextField>

                                        <div className="flex flex-col gap-2">
                                            <Label>Upload CV (PDF only)</Label>
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) =>
                                                    setCv(e.target.files[0])
                                                }
                                            />
                                        </div>
                                    </form>
                                </Surface>
                            </Modal.Body>

                            <Modal.Footer className="p-6 pt-4 flex gap-3 border-t border-[#d6c3a5] bg-[#f3e7d4]">
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>

                                <Button
                                    onClick={submitApplication}
                                    slot="close"
                                    className="flex-1 rounded-xl bg-[#2c221e] text-[#f8f3ea]"
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            )}
        </Modal>
    );
}