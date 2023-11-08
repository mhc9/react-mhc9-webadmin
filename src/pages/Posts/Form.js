import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useGetInitialFormDataQuery } from '../../services/postApi/postApi'
import 'react-quill/dist/quill.snow.css'

const contentSchema = Yup.object().shape({

})

const PostForm = () => {
    const [value, setValue] = useState('');
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    console.log(value);

    const handleSubmit = (values, formik) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{
                title: '',
                full_text: ''
            }}
            validationSchema={contentSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <div className="flex flex-row mb-2">
                            <div className="flex-none w-3/4 p-2 mr-2">
                                <div className="form-control mb-2">
                                    <label htmlFor="">หัวข้อข่าว</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">รายละเอียด</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={value}
                                        onChange={setValue}
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                                ['blockquote', 'code-block'],

                                                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                                                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                                                [{ 'direction': 'rtl' }],                         // text direction

                                                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                [ 'link', 'image', 'video', 'formula' ],          // add's image support
                                                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                                                [{ 'font': [] }],
                                                [{ 'align': [] }],

                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-auto w-3/12 border-l p-4">
                                <div className="form-control mb-2">
                                    <label htmlFor="">ประเภท</label>
                                    <select name="" className="input input-bordered w-full">
                                        <option value="">-- เลือก --</option>
                                        {formData?.categories?.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">ผู้แต่ง</label>
                                    <select name="" className="input input-bordered w-full">
                                        <option value="">-- เลือก --</option>
                                        {formData?.authors?.map(author => (
                                            <option key={author.id} value={author.id}>
                                                {author.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-row justify-end">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default PostForm