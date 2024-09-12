import React from 'react';
import { baseUrl } from '@/utils/CloudFront';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
export default function TermsConditionModal({ isOpen, onOpenChange, setIsAccepted, obligatory = false, callback = () => null }) {
    const officeViewerUrlTerms = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${baseUrl}terms-conditions/Panda-Terms-and-Conditions-of-Use.docx`)}`;
    const officeViewerUrlPrivacy = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${baseUrl}terms-conditions/Panda-Privacy-Policy.docx`)}`;
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='xl' hideCloseButton={obligatory} isDismissable={!obligatory}>
            <ModalContent className='h-[90vh] dark:bg-zinc-900 dark:text-white overflow-y-scroll' style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {(onClose) => (
                    <>
                        <ModalHeader className='w-full'>
                            <p className='text-center w-full text-2xl'>Panda Politics</p>
                        </ModalHeader>
                        <ModalBody>
                            <Tabs className='dark:dark' aria-label='Options'>
                                <Tab className='dark:dark' key='Terms/Conditions' title='Terms And Conditions'>
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-center text-2xl'>Panda Terms and Conditions</p>
                                        <iframe
                                            src={officeViewerUrlTerms}
                                            width="100%"
                                            height="600px"
                                            style={{ border: 'none' }}
                                            title="Terms and Conditions"
                                        />
                                    </div>
                                </Tab>
                                <Tab className='dark:dark' key='PrivacyPolicy' title='PrivacyPolicy'>
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-center text-2xl'>Privacy Policy</p>
                                        <iframe
                                            src={officeViewerUrlPrivacy}
                                            width="100%"
                                            height="600px"
                                            style={{ border: 'none' }}
                                            title="Terms and Conditions"
                                        />
                                        <Button type='button' color='success' className='text-white' onClick={() => { setIsAccepted && setIsAccepted(true); onClose(); callback(); }}>
                                            Accept
                                        </Button>
                                    </div>
                                </Tab>
                            </Tabs>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
