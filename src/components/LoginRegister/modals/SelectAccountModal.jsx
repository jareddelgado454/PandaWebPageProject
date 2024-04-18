import React, {useState} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

const SelectAccountModal = ({ isOpen, onOpenChange, providerIdentitySelected }) => {

    const [formData, setFormData] = useState({
        role : null,
        agreed : false
    });

    const handleCreate = async () => {

    }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={true}>
          <ModalContent className='bg-zinc-700 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <h2 className='text-[30px] font-bold mb-3'>Account settings</h2>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className='w-[450px] px-4 rounded-md  pb-8'>
                        <p className='mb-1'>Choose your account type: <span className='text-red-400'>*</span></p>
                        <select
                            value={formData.role}
                            onChange={(event) => setFormData({ ...formData, role:event.target.value })}
                            className='block w-full bg-zinc-800 text-white py-3 px-4 rounded-lg mb-2'
                        >
                            <option className='text-white' value='' disabled>
                                Select an option
                            </option>
                            <option className='text-white' value='customer'>
                                Customer
                            </option>
                            <option className='text-white' value='technician'>
                                Technician
                            </option>
                        </select>

                        <p className='text-[12px] font-light text-gray-100'>
                            <span className='text-[14px] font-bold text-white'>Customer account:</span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>

                        <p className='text-[12px] font-light text-gray-100 mb-3'>
                            <span className='text-[14px] font-bold text-white'>Technician account:</span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>

                        <div className="flex items-center gap-x-2 mb-2">
                            <input
                                type="checkbox"
                                checked={formData.agreed}
                                onChange={(event) => setFormData({...formData, agreed : !formData.agreed})}
                                className="rounded border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400"
                            />
                            <p className='text-white'>Check here to accept the <span className='text-emerald-300 cursor-pointer font-semibold'>Terms and conditions</span></p>
                        </div>

                        <button onClick={() => handleCreate()}  className=' w-full py-3 text-[19px] bg-emerald-500 hover:bg-emerald-500/90 transition-colors rounded-lg text-white'>Create account</button>

                    </div>
                    
                </ModalBody>
                <ModalFooter>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>
  )
}

export default SelectAccountModal