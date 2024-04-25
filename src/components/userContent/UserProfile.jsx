'use client';
import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateInformation } from "@/graphql/users/mutation/users";
import { RiFingerprintFill, RiUser3Fill  } from "react-icons/ri";
import { TbUserSquare, TbCertificate2 , TbId, TbTool   } from "react-icons/tb";
import { statesUSA } from '@/assets/data/StatesUSA';
function UserProfile({ user }) {
  const onHandleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
        await updateUserAttributes({
            userAttributes: {
                'custom:fullName': values.fullName,
                'custom:address': values.address,
                'custom:city': values.city,
                'custom:state': values.state,
                'custom:phoneNumber': values.contactNumber,
                'custom:zipCode': values.zipCode
            }
        });
        await client.graphql({
            query: updateInformation,
            variables: {
                email: values.email,
                input: {
                    id: user.id,
                    ...values
                }
            }
        })
        await retrieveOneUser();
        toast.success("Updated successfully.");
    } catch (error) {
        console.log(error);
        toast.error(`Error during the process.`);
    }
}
  return (
    // <Formik
    //     initialValues={{
    //       fullName: user['custom:fullName'] || '',
    //       email: user.email || '',
    //       address: user['custom:address'] || '',
    //       city: user['custom:city'] || '',
    //       state: user['custom:state'] || '',
    //       zipCode: user['custom:zipCode'] || 0,
    //       contactNumber: user['custom:phoneNumber'] || 0,
    //       status: 'active'
    //     }}
    //     validationSchema={formSchema}
    //     validateOnChange={false}
    //     onSubmit={onHandleSubmit}
    //   >
    //     {({ errors, isValid }) => {
    //       return (
    //         <Form
    //           className="w-full h-full flex flex-col gap-7"
    //           autoComplete="off"
    //         >
    //           <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
    //             <div className="w-full md:w-2/4">
    //               <label
    //                 htmlFor="grid-fullName"
    //                 className="block text-gray-300 text-sm font-bold mb-2"
    //               >
    //                 Full Name
    //               </label>
    //               <Field
    //                 type="text"
    //                 name="fullName"
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //                 id="grid-fullName"
    //               />
    //               <ErrorMessage name="fullName" component={() => (<div className="text-red-600">{errors.fullName}</div>)} />
    //             </div>
    //             <div className="w-full md:w-2/4">
    //               <label
    //                 htmlFor="grid-email"
    //                 className="block text-gray-300 text-sm font-bold mb-2"
    //               >
    //                 Email
    //               </label>
    //               <Field
    //                 type="email"
    //                 name="email"
    //                 disabled
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //               />
    //               <ErrorMessage name="email" component={() => (<div className="text-red-600">{errors.email}</div>)} />
    //             </div>
    //           </div>

    //           <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
    //             <div className="w-full md:w-2/4 md:mb-0">
    //               <label
    //                 className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
    //                 htmlFor="states"
    //               >
    //                 State
    //               </label>
    //               <Field
    //                 as="select"
    //                 name="state"
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //               >
    //                 {statesUSA.map((estado, index) => (
    //                   <option key={index} value={estado}>
    //                     {estado}
    //                   </option>
    //                 ))}
    //               </Field>
    //               <ErrorMessage name="state" component={() => (<div className="text-red-600">{errors.state}</div>)} />
    //             </div>
    //             <div className="w-full md:w-2/4 md:mb-0">
    //               <label
    //                 className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
    //                 htmlFor="grid-city"
    //               >
    //                 Address
    //               </label>
    //               <Field
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //                 type="text"
    //                 placeholder="address"
    //                 name="address"
    //               />
    //               <ErrorMessage name="address" component={() => (<div className="text-red-600">{errors.address}</div>)} />
    //             </div>
    //           </div>

    //           <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
    //             <div className="w-full md:w-2/4 md:mb-0">
    //               <label
    //                 className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
    //                 htmlFor="grid-zip"
    //               >
    //                 Zip
    //               </label>
    //               <Field
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //                 id="grid-zip"
    //                 type="text"
    //                 placeholder="90210"
    //                 name="zipCode"
    //               />
    //               <ErrorMessage name="zipCode" component={() => (<div className="text-red-600">{errors.zipCode}</div>)} />
    //             </div>
    //             <div className="w-full md:w-2/4 md:mb-0">
    //               <label
    //                 className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
    //                 htmlFor="grid-city"
    //               >
    //                 City
    //               </label>
    //               <Field
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //                 id="grid-city"
    //                 type="text"
    //                 placeholder="Miami"
    //                 name="city"
    //               />
    //               <ErrorMessage name="city" component={() => (<div className="text-red-600">{errors.city}</div>)} />
    //             </div>
    //           </div>

    //           <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
    //             <div className="w-full md:w-2/4 md:mb-0">
    //               <label
    //                 className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
    //                 htmlFor="grid-contactNumber"
    //               >
    //                 Contact Number
    //               </label>
    //               <Field
    //                 className={`block appearance-none w-full bg-zinc-700 border ${errors.fullName ? 'border-red-600' : 'border-zinc-700'} text-white py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-emerald-500`}
    //                 id="grid-contactNumber"
    //                 type="text"
    //                 placeholder="90210"
    //                 name="contactNumber"
    //               />
    //               <ErrorMessage name="contactNumber" component={() => (<div className="text-red-600">{errors.contactNumber}</div>)} />
    //             </div>
    //           </div>
    //           <div className="w-full pb-5">
    //             <button
    //               type="submit"
    //               disabled={!isValid}
    //               className={`${!isValid ? 'bg-gray-200' : 'bg-green-panda'} p-3 rounded-lg text-white font-bold w-full transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300`}
    //             >
    //               Update Information
    //             </button>
    //           </div>
    //         </Form>
    //       )
    //     }}
    // </Formik>
    <div className='w-full flex flex-wrap px-3'>
        <div className='w-1/2 rounded-xl cursor-pointer flex flex-row items-center p-3 pr-5'>
          <div className='flex items-center justify-center bg-zinc-700 rounded-lg px-2 py-3 mr-3'>
            <TbUserSquare className='text-[30px] text-emerald-400'/>
          </div>  
          <div className='flex flex-col'>
            <h4 className='flex gap-x-1 items-center text-[20px] font-bold'>  PERSONAL INFORMATION </h4>
            <p className='text-gray-300'>Here you can access and complete your personal information, such as name, city, phone number, etc. You can also edit.</p>
          </div>       
        </div>
        <div className='w-1/2 rounded-xl cursor-pointer flex flex-row items-center p-3 pr-5'>
          <div className='flex items-center justify-center bg-zinc-700 rounded-lg px-2 py-3 mr-3'>
            <TbTool  className='text-[30px] text-emerald-400'/>
          </div>  
          <div className='flex flex-col'>
            <h4 className='flex gap-x-1 items-center text-[20px] font-bold'>SPECIALIZATION AREA</h4>
            <p className='text-gray-300'>Here you can complete the information about the cars you specialize in repairing, so we can recommend you.</p>
          </div>       
        </div>
        <div className='w-1/2 rounded-xl cursor-pointer flex flex-row items-center p-3 pr-5'>
          <div className='flex items-center justify-center bg-zinc-700 rounded-lg px-2 py-3 mr-3'>
            <TbCertificate2  className='text-[30px] text-emerald-400'/>
          </div>  
          <div className='flex flex-col'>
            <h4 className='flex gap-x-1 items-center text-[20px] font-bold'>CERTIFICATIONS</h4>
            <p className='text-gray-300'>Here you can upload the certifications you have, if you have them, certifications in the field of mechanics.</p>
          </div>       
        </div>
        <div className='w-1/2 rounded-xl cursor-pointer flex flex-row items-center p-3 pr-5'>
          <div className='flex items-center justify-center bg-zinc-700 rounded-lg px-2 py-3 mr-3'>
            <TbId  className='text-[30px] text-emerald-400'/>
          </div>  
          <div className='flex flex-col'>
            <h4 className='flex gap-x-1 items-center text-[20px] font-bold'>  PROFILE CARD </h4>
            <p className='text-gray-300'>Here you can see your profile card, it is how potential clients see you and can interact with your information.</p>
          </div>       
        </div>
    </div>
  )
}

const formSchema = Yup.object().shape({
  fullName: Yup.string().required('Required').max(50),
  email: Yup.string().email().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.number().required('Required').positive().integer(),
  contactNumber: Yup.number().required('Required').positive().integer()
});

export default UserProfile;