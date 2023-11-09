import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { DatePicker } from '@mui/x-date-pickers'
import { useGetInitialFormDataQuery } from '../../services/postApi/postApi'
import DotLoading from '../../components/Loadings/DotLoading'
import moment from 'moment/moment'
import { store } from '../../slices/postSlice'
import 'react-quill/dist/quill.snow.css'
import { useDispatch } from 'react-redux'

const contentSchema = Yup.object().shape({

})

const PostForm = () => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [fullText, setFullText] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [publishUp, setPublishUp] = useState(moment());

    const handleFullTextChange = (formik, content) => {
        console.log(content);
        setFullText(content);
        formik.setFieldValue('full_text', content);
    };

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                title: '',
                intro_text: '',
                full_text: '',
                content_type_id: '1',
                category_id: '',
                author_id: '',
                featured: '',
                publish_up: moment().format('YYYY-MM-DDTHH:mm:ss'),
                publish_down: '',
                tags: '',
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
                                    <label htmlFor="">หัวข้อ</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">เนื้อหาย่อ</label>
                                    <input
                                        type="text"
                                        name="intro_text"
                                        value={formik.values.intro_text}
                                        onChange={formik.handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">รายละเอียด</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={fullText}
                                        onChange={(content) => handleFullTextChange(formik, content)}
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
                                    <label htmlFor="">วันที่เผยแพร่</label>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={publishUp}
                                        onChange={(date) => {
                                            setPublishUp(date);
                                            formik.setFieldValue('publish_up', date.format('YYYY-MM-DDTHH:mm:ss'));
                                        }}
                                        sx={{
                                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                border: `${(formik.errors.publish_up && formik.touched.publish_up) ? '1px solid red' : 'inherit'}`,
                                            }
                                        }}
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">ประเภท</label>
                                    {isLoading && <DotLoading />}
                                    {!isLoading && (
                                        <select
                                            name="category_id"
                                            value={formik.values.category_id}
                                            onChange={formik.handleChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">-- เลือก --</option>
                                            {formData?.categories?.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">ผู้แต่ง</label>
                                    {isLoading && <DotLoading />}
                                    {!isLoading && (
                                        <select
                                            name="author_id"
                                            value={formik.values.author_id}
                                            onChange={formik.handleChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">-- เลือก --</option>
                                            {formData?.authors?.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">การแสดงผล</label>
                                    {isLoading && <DotLoading />}
                                    {!isLoading && (
                                        <select
                                            name="content_type_id"
                                            value={formik.values.content_type_id}
                                            onChange={formik.handleChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">-- เลือก --</option>
                                            <option value="1">เนื้อหา</option>
                                            <option value="2">ไฟล์ PDF</option>
                                            <option value="3">รูปภาพ</option>
                                            {/* {formData?.authors?.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))} */}
                                        </select>
                                    )}
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">รูปหน้าปก</label>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setFeaturedImage(e.target.files[0]);
                                            formik.setFieldValue('featured', e.target.files[0]);
                                        }}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    {featuredImage && (
                                        <div className="border m-1 overflow-hidden rounded-md">
                                            <img src={URL.createObjectURL(featuredImage)} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-row justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <DotLoading /> : 'บันทึก'}
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