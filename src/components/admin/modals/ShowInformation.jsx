'use client'
import React from "react";
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import { DateFormatter } from "@/utils/parseDate";
import { generateTempoPassword } from "@/utils/GenerateTempoPassword";
import { baseUrl } from "@/utils/CloudFront";
const ShowInformation = ({ isOpen, onOpenChange, user }) => {
    const handleSetUserPassword = async() => {
        const passwordGenerated = generateTempoPassword();
        console.log(passwordGenerated);
    }
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex justify-center items-center">
                        <p className="text-center">{user.fullName} Information</p>
                    </ModalHeader>
                    <ModalBody className="flex flex-col lg:flex-row gap-10 justify-center">
                        <div className="flex items-center">
                            <Image
                                src={user.profilePicture ? baseUrl + user.profilePicture : '/image/defaultProfilePicture.jpg'}
                                alt="user_image_modalShow"
                                width={450}
                                height={450}
                                className="rounded w-[14rem] h-[14rem]"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <div>
                                <p><strong>Id:</strong> { user.id }</p>
                            </div>
                            <div>
                                <p><strong>Name:</strong> { user.fullName }</p>
                            </div>
                            <div>
                                <p><strong>Email:</strong> { user.email }</p>
                            </div>
                            <div>
                                <p><strong>Status:</strong> { user.status }</p>
                            </div>
                            <div>
                                <p><strong>Member since:</strong> { DateFormatter(user.createdAt) }</p>
                            </div>
                            <div className="flex gap-2" onClick={handleSetUserPassword}>
                                <strong>Options: </strong>
                                <p className="text-red-500 cursor-pointer">Reset Password</p>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ShowInformation;
