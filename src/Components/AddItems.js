import React ,{useState} from "react";
import Swal from 'sweetalert2'

const AddItems = () => {
    const [list, setList] = React.useState([]);
    const [item, setItem] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
   
  
    React.useEffect(() => {
      const json = localStorage.getItem("list");
      const loadedlist = JSON.parse(json);
      if (loadedlist) {
        setList(loadedlist);
      }
    }, []);
  
    React.useEffect(() => {
      const json = JSON.stringify(list);
      localStorage.setItem("list", json);
    }, [list]);
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const newitem = {
        id: new Date().getTime(),
        text: item,
        price:itemPrice,
        completed: false,
      };
      setList([...list].concat(newitem));
      setItem("");
    }
  
    function deleteitem(id) {
      let updatedList = [...list].filter((item) => item.id !== id);
      setList(updatedList);
    }
  
    function toggleComplete(id) {
      let updatedList = [...list].map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      setList(updatedList);

    }
   function onclickhadler(){

    (async () => {

        const { value: formValues } = await Swal.fire({
          title: 'Please Enter your Item and Price',
          html:
            '<input id="swal-input1" class="swal2-input">' +
            '<input id="swal-input2" class="swal2-input">',
          focusConfirm: false,
          preConfirm: () => {

            const newitem = {
                id: new Date().getTime(),
                text:document.getElementById('swal-input1').value,
                price:document.getElementById('swal-input2').value,
                completed: false,
              };
              setList([...list].concat(newitem));
              setItem("");
          
          }

        })
        
        if (formValues) {
          Swal.fire(JSON.stringify(formValues))
        }
        
        })()
   }


    return (
      <div id="item-list">
        <h1>Shopping List</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Enter the items"
            onChange={(e) => setItem(e.target.value)}
            value={item}
          />
        <input
            type="text"
            placeholder="Enter Price kr"
            onChange={(e) => setItemPrice(e.target.value)}
            value={itemPrice}
          />
          <button type="submit" >Add item</button>
          <button onClick={() => onclickhadler(item,itemPrice)} >Add item</button>
         
        </form>
        {list.map((item) => (
          <div key={item.id} className="item">
            <div className="item-text">
              <input
                type="checkbox"
                id="completed"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />
                <div>
                    {item.text}
                    {item.price}
                </div>
              
            </div>
            <div className="item-actions">
              <button onClick={() => deleteitem(item.id)}>Delete</button>
              
              
            </div>
          </div>
        ))}
      </div>
    );
  };
export default AddItems;