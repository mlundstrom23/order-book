function reconcileOrder(existingBook, incomingOrder) {

  // If existing book is empty, return incoming order in an array
  if (existingBook.length === 0) {
    return [incomingOrder]
  }

  // Create array of all orders (including incoming)
  const allOrders = existingBook.concat([incomingOrder])

  // If all the orders are type === sell, return all orders
  if (allOrders.filter(order => order.type === 'sell').length === allOrders.length) {
    return allOrders
  }

  // Define comparison objects
  const o1 = allOrders[0]
  const o2 = allOrders[1]

  // Enter condition if all object members are inequal
  // Complete incompatibility, return all orders
  if (o1.type     !== o2.type     && 
      o1.quantity !== o2.quantity &&
      o1.price    !== o2.price) { 
    return allOrders 
  }

  // Enter condition if type is inequal, but all other members are equal
  // Return empty array
  if (o1.type     !== o2.type     && 
      o1.quantity === o2.quantity &&
      o1.price    === o2.price) { 
    return [] 
  }

  // Enter condition if type and quantity are inequal, but price is equal
  // Check if quantity will be greater than or less than 0
  // Return buy or sell object shape
  if (o1.type     !== o2.type     && 
      o1.quantity !== o2.quantity &&
      o1.price    === o2.price) {
    
    if (o1.quantity - o2.quantity > 0) {
      return [{
        type: 'buy',
        quantity: o1.quantity - o2.quantity,
        price: o1.price,
      }]
    } else if (o2.quantity - o1.quantity > 0) {
      return [{
        type:'sell',
        quantity: o2.quantity - o1.quantity,
        price: o1.price,
      }]
    }   
  }
  
  // Enter condition if type and price are inequal, but quantity is equal
  // Check if price will be greater then or less than 0
  // Return expected shape
  if (o1.type     !== o2.type  && 
      o1.quantity === o2.quantity) {
    if (o1.price > o2.price) { 
      return [] 
    } else if (o1.price < o2.price) {
      return allOrders
    }  
  }  
}

module.exports = reconcileOrder