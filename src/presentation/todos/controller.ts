import {Request, Response} from 'express'
import { prisma } from '../../data/postres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
 

//const todos = [
//    {id: 1, text: 'Comprar leche', completedAt: new Date() },
//    {id: 2, text: 'Comprar pan', completedAt: null },
//    {id: 3, text: 'Comprar manteca', completedAt: new Date() },

//]


export class TodosController {
    constructor(){}

    public getTodos = async(req:Request,res: Response) =>{
        const todos = await prisma.todo.findMany()
        return res.json (todos)
    } 

    public getTodosById = async(req:Request,res: Response) =>{
        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({error: 'ID argument es not a number'})

        const todo = await prisma.todo.findFirst({
            where: { id},
        });
     
        (todo)
        ? res.json(todo)
        : res.status(404).json({error: `TODO whith id ${id} not found`})
    } 

    public createTodos = async (req:Request,res: Response) =>{

        const [error, createTodoDto] = CreateTodoDto.create(req.body)

        if(error) return res.status(400).json({error}); 

        const todo = await prisma.todo.create({
            data:createTodoDto!
        }) 

       res.json(todo)
    } 


    public updateTodo = async (req:Request, res:Response) =>{

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        }) 
        
        if(error!=undefined) return res.status(404).json({error})
        const todo = await prisma.todo.findFirst({
            where: { id },
        });
        
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`})
        
        
        const updateTodo = await prisma.todo.update({
            where: {
                id
            },
            data: updateTodoDto!.values
        });     
        res.json(updateTodo)
        
    }
    public deleteTodo = async(req:Request, res:Response) =>{
        const id = +req.params.id;
        const todo = await prisma.todo.findFirst({
            where: {
                id
            },
        });
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        const deleted = await prisma.todo.delete({
            where: {id}
        }) ;

        (deleted)
            ? res.json(deleted)
            : res.status(400).json

            

    }
}