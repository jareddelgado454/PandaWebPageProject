'use client';
import React from 'react';
import { FaCircleExclamation, FaKey, FaUserXmark } from "react-icons/fa6";
import { useDisclosure, Tooltip } from "@nextui-org/react";
import { DeleteUserModal, PassWordModal, SendReportModal } from "@/components/modalUser";
export default function SideBar({ user }) {
    const { isOpen: isDeleteUserModalOpen, onOpen: onDeleteUserModalOpen, onOpenChange: onDeleteUserModalChange } = useDisclosure();
    const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onOpenChange: onChangePasswordModalChange } = useDisclosure();
    const { isOpen: isSendReportModalOpen, onOpen: onSendReportModalOpen, onOpenChange: onSendReportModalChange } = useDisclosure();
    return (
        <>
            <DeleteUserModal isOpen={isDeleteUserModalOpen} onOpenChange={onDeleteUserModalChange} user={user} />
            <PassWordModal isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalChange} />
            <SendReportModal isOpen={isSendReportModalOpen} onOpenChange={onSendReportModalChange} />
            <div className="bg-zinc-800 rounded-lg w-[4%] order-3 z-10">
                <div className="flex flex-col items-center gap-4 py-4">
                    <Tooltip key="left" placement="right" content="Delete My Account" color="danger">
                        <div onClick={onDeleteUserModalOpen} className="p-4 bg-rose-600 rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                            <FaUserXmark className="text-white" />
                        </div>
                    </Tooltip>
                    <Tooltip key="2" placement="right" content="Change my password" color="primary">
                        <div onClick={onChangePasswordModalOpen} className="p-4 bg-cyan-600 rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                            <FaKey className="text-white" />
                        </div>
                    </Tooltip>
                    <Tooltip key="3" placement="right" content="Send a report" color="warning">
                        <div onClick={onSendReportModalOpen} className="p-4 bg-amber-400 rounded-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                            <FaCircleExclamation className="text-white" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}
