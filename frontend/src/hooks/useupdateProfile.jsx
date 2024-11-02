import { useQueryClient, useMutation } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const useUpdateProfile = () => {

    const queryClient = useQueryClient();
    const{mutate:updateProfile, isLoading:isUpdating}   = useMutation({
		mutationFn: async(formData) => {
			try {
				const res = await fetch('/api/users/update', {
					method:"POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(formData)
				});

				const data = await res.json();

				if(!res.ok) {
					throw new Error(data.error);
				}

				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		}, onSuccess: () => {
			toast.success("profile updated succesfuly");
			queryClient.invalidateQueries({queryKey: ["authUser"]});
			queryClient.invalidateQueries({queryKey: ["userProfile"]});

		},
        onError: (error) => {
            toast.error(error.message);
        }
	 })

     return{updateProfile, isUpdating};
}


export default useUpdateProfile;