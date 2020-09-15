function arrayRemoveItemById(array, id) {
  return array.filter(item => item.id !== id)
}

function arrayUpdateItemById(array, updatedItem) {
  return array.map(item => {
    if (item.id !== updatedItem.id) {
      return item
    } else {
      return { ...item, ...updatedItem }
    }
  })
}

function arraySelectItemByProperty(array, propertyName, propertyValue) {
  return array.find(item => item[propertyName] === propertyValue)
}
