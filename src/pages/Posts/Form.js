import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment/moment'
import { store } from '../../slices/postSlice'
import { useGetInitialFormDataQuery } from '../../services/postApi/postApi'
import DotLoading from '../../components/Loadings/DotLoading'
import 'react-quill/dist/quill.snow.css'

const contentSchema = Yup.object().shape({

})

const PostForm = () => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [fullText, setFullText] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [publishUp, setPublishUp] = useState(moment());
    const [publishDown, setPublishDown] = useState(moment());
    const [pdfFile, setPdfFile] = useState(null);

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
                publish_up: moment().format('YYYY-MM-DDTHH:mm:ss'),
                publish_down: moment().format('YYYY-MM-DDTHH:mm:ss'),
                featured: '',
                urls: '',
                tags: '',
                pdf: '',
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
                                    {(formik.errors.title && formik.touched.title) && (
                                        <span className="text-red-500">{formik.errors.title}</span>
                                    )}
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
                                    {(formik.errors.intro_text && formik.touched.intro_text) && (
                                        <span className="text-red-500">{formik.errors.intro_text}</span>
                                    )}
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
                                    {(formik.errors.publish_up && formik.touched.publish_up) && (
                                        <span className="text-red-500">{formik.errors.publish_up}</span>
                                    )}
                                </div>
                                <div className="form-control mb-2">
                                    <label htmlFor="">ถึงวันที่</label>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={publishDown}
                                        onChange={(date) => {
                                            setPublishDown(date);
                                            formik.setFieldValue('publish_down', date.format('YYYY-MM-DDTHH:mm:ss'));
                                        }}
                                        sx={{
                                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                border: `${(formik.errors.publish_down && formik.touched.publish_down) ? '1px solid red' : 'inherit'}`,
                                            }
                                        }}
                                    />
                                    {(formik.errors.publish_down && formik.touched.publish_down) && (
                                        <span className="text-red-500">{formik.errors.publish_down}</span>
                                    )}
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
                                    {(formik.errors.category_id && formik.touched.category_id) && (
                                        <span className="text-red-500">{formik.errors.category_id}</span>
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
                                    {(formik.errors.author_id && formik.touched.author_id) && (
                                        <span className="text-red-500">{formik.errors.author_id}</span>
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
                                            <option value="4">วีดิโอ</option>
                                            {/* {formData?.authors?.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name}
                                                </option>
                                            ))} */}
                                        </select>
                                    )}
                                    {(formik.errors.content_type_id && formik.touched.content_type_id) && (
                                        <span className="text-red-500">{formik.errors.content_type_id}</span>
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
                                {formik.values.content_type_id === '4' && (
                                    <div className="form-control mb-2">
                                        <label htmlFor="">ลิงค์วีดิโอ</label>
                                        <input
                                            type="text"
                                            name="urls"
                                            value={formik.values.urls}
                                            onChange={formik.handleChange}
                                            className="file-input file-input-bordered w-full"
                                        />
                                    </div>
                                )}
                                {formik.values.content_type_id === '2' && (
                                    <div className="form-control mb-2">
                                        <label htmlFor="">ไฟล์ Pdf</label>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                setPdfFile(e.target.files[0]);
                                                formik.setFieldValue('pdf', e.target.files[0]);
                                            }}
                                            className="file-input file-input-bordered w-full"
                                        />
                                        {pdfFile && (
                                            <div className="m-1 overflow-hidden rounded-md font-thin text-blue-500">
                                                <i className="far fa-file-pdf mr-1"></i>
                                                {pdfFile?.name}
                                            </div>
                                        )}
                                    </div>
                                )}
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