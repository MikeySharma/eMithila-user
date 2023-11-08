const getCustomerFromLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : ''

export const config = {
	headers: {
		Authorization: `Bearer ${getCustomerFromLocalStorage.token ? getCustomerFromLocalStorage.token : ''}`,
		Accept: "application/json",
	}
}