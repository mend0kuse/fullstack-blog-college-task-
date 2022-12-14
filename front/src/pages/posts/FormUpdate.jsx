import React from 'react'
import MyButton from '../../components/UI/button/MyButton'
import MyInput from '../../components/UI/input/MyInput'

const FormUpdate = ({ updatedPost, setUpdatedPost,setUploadFile, fn }) => {
	return (
		<form className='post__update'>
			<MyInput value={updatedPost.title} onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })} type='text' placeholder='Название' />
			<MyInput value={updatedPost.body} onChange={e => setUpdatedPost({ ...updatedPost, body: e.target.value })} type='text' placeholder='Контент' />
			<input type="file" onChange={(e) => setUploadFile(e.target.files)} />
			<MyButton onClick={e => fn(e)}>Обновить</MyButton>
		</form>
	)
}

export default FormUpdate