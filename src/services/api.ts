
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = 'https://threed-interior-visualization-system.onrender.com';

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');
  
    // If body is FormData, do not set Content-Type manually.
    const headers =
      options.body instanceof FormData
        ? {
            ...(options.headers || {})
          }
        : {
            'Content-Type': 'application/json',
            ...(options.headers || {})
          };
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            errorData.message ||
            `Request failed with status ${response.status}`
        );
      }
  
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      toast({
        title: "Request Failed",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
};

export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    return fetchWithAuth('/login', {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  
  register: async (username: string, password: string, first_name: string, last_name: string, image:string="") => {
    return fetchWithAuth('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, first_name, last_name, image })
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};


export const viewerAPI = {

  getImageFromText: async (prompt: string) => {
    return fetchWithAuth('/anonymous', {
      method: 'POST',
      body: JSON.stringify({ messages: prompt, image: '' })
    });
  },

  getFromImage: async (image: File, prompt: string) => {
    const formData = new FormData();
    formData.append("messages", prompt);
    formData.append("image", image)
  
    return fetchWithAuth('/anonymous', {
      method: 'POST',
      body: formData,
      // Remove 'Content-Type' header so the browser can set it to multipart/form-data with the correct boundary
      headers: {
        'accept': 'application/json'
      }
    });
  },
  
  

};
