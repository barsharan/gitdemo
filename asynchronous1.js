// Mock asynchronous functions
function getButter() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Husband got butter.');
        resolve('Butter');
      }, 2000);
    });
  }
  
  function getColdDrinks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Husband got cold drinks.');
        resolve('Cold Drinks');
      }, 1000);
    });
  }
  
  // Using async/await
  async function getButterAndDrinks() {
    try {
      const butter = await getButter();
      console.log(`Got ${butter}.`);
  
      const drinks = await getColdDrinks();
      console.log(`Got ${drinks}.`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  getButterAndDrinks();
  