'use client';
import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import { baseUrl } from '@/utils/CloudFront';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from '@nextui-org/react';

export default function TermsConditionModal({ isOpen, onOpenChange, setIsAccepted, isAccepted, obligatory = false, callback = () => null }) {
    const [terms, setTerms] = useState('');
    const [privacyPolitics, setPrivacyPolitics] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTermsAndConvertDocument = async () => {
            try {

                const response = await fetch(`${baseUrl}terms-conditions/Panda-Terms-and-Conditions-of-Use.docx`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const arrayBuffer = await response.arrayBuffer();
                const textContent = await convertDocxToPlainText(arrayBuffer);
                setTerms(textContent);
            } catch (error) {
                console.error('Error fetching or converting document:', error);
                setError('No se pudieron cargar los términos y condiciones.');
            } finally {
                setLoading(false);
            }
        };
        const fetchPrivacyAndConvertDocument = async () => {
            try {
                //Panda-Privacy-Policy
                const response = await fetch(`${baseUrl}terms-conditions/Panda-Privacy-Policy.docx`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const arrayBuffer = await response.arrayBuffer();
                const textContent = await convertDocxToPlainText(arrayBuffer);
                setPrivacyPolitics(textContent);
            } catch (error) {
                console.error('Error fetching or converting document:', error);
                setError('No se pudieron cargar los términos y condiciones.');
            } finally {
                setLoading(false);
            }
        };

        fetchTermsAndConvertDocument();
        fetchPrivacyAndConvertDocument();
    }, []);

    const convertDocxToPlainText = async (arrayBuffer) => {
        try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value; // Contenido del archivo .docx en texto plano
        } catch (error) {
            console.error('Error converting .docx to plain text:', error);
            throw error;
        }
    };

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
                                    {loading && <div>Cargando...</div>}
                                    {error && <div>{error}</div>}
                                    {terms && (
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-center text-2xl'>Panda Terms and Conditions</p>
                                            <p className='tracking-widest text-justify'>{terms}</p>
                                        </div>
                                    )}
                                </Tab>
                                <Tab className='dark:dark' key='PrivacyPolicy' title='PrivacyPolicy'>

                                    {loading && <div>Cargando...</div>}
                                    {error && <div>{error}</div>}
                                    {terms && (
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-center text-2xl'>Privacy Policy</p>
                                            <p className='tracking-widest text-justify'>{privacyPolitics}</p>
                                            <Button type='button' color='success' className='text-white' onClick={() => { setIsAccepted && setIsAccepted(true); onClose(); callback(); }}>
                                                Accept
                                            </Button>
                                        </div>
                                    )}
                                </Tab>
                            </Tabs>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
