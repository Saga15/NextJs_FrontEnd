export const jsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return jsonString;
    }
  };

  export const validateEmail = (email) => {
    // const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg?.test(email);
  };

  export const validatePhone = (phone) => {
    const phoneformat = /^\d{10}$/; // eslint-disable-line
    return phone?.match(phoneformat);
  };

  export const validatePrice = (price) => {
    const priceformat = /^\d{1,8}(\.\d{0,2})?$/g; // eslint-disable-line
    return price?.match(priceformat);
  };

  export const loadScript = async (src) => {
    const ele = document?.getElementById(src);
    if (ele) {
      ele.remove();
    }
    const script = document.createElement('script');
    script.id = src;
    script.src = src;
    script.type = 'text/javascript';
    script.async = false;
    document.body.appendChild(script);
  };

  export const getUserData = async () => {
    try {
      const userdata = localStorage?.getItem('userdata');
      const decodedData = await jsonParse(userdata);
      return decodedData;
    } catch (err) {
      return null;
    }
  };

  export const validateAmount = (amount) => {
    const amountFormat = /^[1-9]\d{0,8}(((,\d{3}){1})?(\.\d{0,2})?)$/;
    return amountFormat.test(amount);
  };

  export const capitalizeFirstLetter = (string) => {
    if(!string) return string;
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  export const checkIfEmpty = (value, type = 'default') => {
    switch (type) {
      case 'A': return (!value || (value && !value.length));
      case 'O': return (!value || (value && !Object.keys(value).length));
      default: return !value;
    }
  };

  export const cleanObject = (obj) => {
    const cleanedObject = Object.entries(obj).reduce(
      (a, [k, v]) => (v || v === false || v === 0 ? ((a[k] = v), a) : a), // eslint-disable-line
      {},
    );
    return cleanedObject;
  };

  export const userRestrictions = (element, permittedUsers = [], isLink = false) => {
    const roleId = 1;
    const hasPermissions = permittedUsers?.length && permittedUsers?.includes(roleId);
    if (!hasPermissions) return isLink ? 'javascript:void(0)' : '';
    return element;
  };

  export const generateUrl = (url, urlParams = {}) => {
    const searchParams = new URLSearchParams(
      cleanObject(urlParams),
    ).toString();
    let apiEndpoint = url;
    if (!checkIfEmpty(urlParams, 'O')) apiEndpoint = `${apiEndpoint}?${searchParams}`;
    return apiEndpoint;
  };

  export const toLowerCase = (str = '') => {
    return String(str).toLowerCase();
  };

  export const deepClone = (obj = {}) => {
    return JSON.parse(JSON.stringify(obj));
  };

  export const deepClonedeepClone = (data) => {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return '';
    }
  };

  export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  export const getLocalStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return false;
    }
  }

  export const removeLocalStorage = (key) => {
    try {
      if (typeof key === 'string')
        return localStorage.removeItem(key);

      if (typeof key === 'object') {
        key.map(item => { return removeLocalStorage(item); });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  export const renderDefaultLayout = (route) => {
    if(route === "/login" || route === "/forgot-password" || route === "/reset-password"){
      return false;
    }else{
      return true;
    }
  }

  export const formatDate = (date: string | Date, includeTime: boolean = false) => {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
    
    return d.toLocaleString('en-GB', options);
  };

export const formattedData =(response)=>{
   return response?.map(item => ({
    year: new Date(item?.datetime).getFullYear(), // Extract year
    month: new Date(item?.datetime).getMonth() + 1, // Get month (0-based index)
    day: new Date(item?.datetime).getDate(), // Get day
    open: item?.open,
    close: item?.close
  }));
} 
  
