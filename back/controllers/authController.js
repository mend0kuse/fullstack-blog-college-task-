import { Author } from '../models/Author.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

const generateAccesToken = (id, username) => {
	const payload = { id, username }
	return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class AuthConroller {
	async registration(req, res) {
		try {
			const { username, password } = req.body
			const candidate = await Author.findOne({ username })
			if (candidate) {
				return res.status(400).json({ message: "Пользователь с таким именем уже сущестует" })
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const user = new Author({ ...req.body, password: hashPassword })
			await user.save()
			return res.status(200).json({ message: "Успешно" })
		} catch (error) {
			console.log(e);
			res.status(400).json({ message: 'Registation Error' })
		}
	}
	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await Author.findOne({ username })
			if (!user) {
				return res.status(400).json({ message: 'Пользователь с таким ником не найден' })
			}
			const validPass = bcrypt.compareSync(password, user.password)
			if (!validPass) {
				return res.status(400).json({ message: 'Неверный пароль' })
			}
			const token = generateAccesToken(user._id, user.username) 
			return res.json({ token })
		} catch (error) {
			console.log(e);
			res.status(400).json({ message: 'Login Error' })
		}
	}
	async userInfo(req, res) {

		const userId = req.user.id

		const findedAuthor = await Author.findOne({ _id: userId })

		res.status(200).send(findedAuthor)

	}
}

export default new AuthConroller()