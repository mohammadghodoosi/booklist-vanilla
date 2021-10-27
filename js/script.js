const title=document.getElementById('title')
const author=document.getElementById('author')
const isbn=document.getElementById('isbn')
const form=document.getElementById('form-book')
const table=document.getElementById('booklist')
const bodyTable=document.getElementById('bookBody')
//first class
class Book{
  constructor(title,author,isbn){
    this.title=title
    this.author=author
    this.isbn=isbn
  }
}
//second class
class UI{
  show(book){
   const row=document.createElement('tr')
   bodyTable.appendChild(row)
   row.innerHTML=`
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href='/' class='delete' style='color:red;text-decoration:none'>X</a></td>`
  }
  alert(message,className){
   const div= document.createElement('div')
   const parent=document.getElementById('parent')
   const child=document.getElementById('child')
   div.appendChild(document.createTextNode(message))
   div.className=className
   parent.insertBefore(div,child)
   setTimeout(function(){div.remove()},3000)
  }
  delete(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove()
    }
  }
}
//third class
class Store{
 static get(){
  let books 
  if(localStorage.getItem('books')===null){
    books=[]
  }else{
    books=JSON.parse(localStorage.getItem('books'))
  }
  return books
 }
 static show(){
  const books=this.get()
  books.forEach(function(book){
    const ui=new UI
    ui.show(book)
  })
 }
 static add(book){
  const books=this.get()
  books.push(book)
  localStorage.setItem('books',JSON.stringify(books))

 }
 static delete(isbn){
  const books=this.get()
  books.forEach(function(book,index){
    if(book.isbn===isbn){
      books.splice(index,1)
    }
  })
  localStorage.setItem('books',JSON.stringify(books))
 }
}
//first event handling
form.addEventListener('submit',function(e){
  const book=new Book(title.value , author.value , isbn.value)
  const ui=new UI
  if(title.value!==''&author.value!==''&isbn.value!==''){
    ui.show(book)
    Store.add(book)
  }else{
    ui.alert('fill all the fields please...','bg-danger container card mb-1')
  }
  e.preventDefault()
})
//second event handling
table.addEventListener('click',function(e){
  const ui=new UI
  ui.delete(e.target)
  Store.delete(e.target.parentElement.previousElementSibling.textContent)
  e.preventDefault()
})
//third event handling
document.addEventListener('DOMContent',Store.show())