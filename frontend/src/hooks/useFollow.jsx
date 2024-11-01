import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";


const useFollow = () => {
   const queryclient = useQueryClient();
   const{mutate:follow, isPending} =  useMutation({
    mutationFn: async(userId) => {
        try {
            const res = await fetch(`/api/users/follow/${userId}`, {
                method: "POST"
            });
            const data = await res.json();

            if(!res.ok) throw new Error(data.error);

            return data;
        } catch (error) {
            throw new Error(error)
        }
        
    },
    onError: () => {
        toast.error(error.message)
    },

    onSuccess: () => {
       Promise.all([
        queryclient.invalidateQueries({queryKey: ["suggestedUsers"]}), // updated the right panel suggested users after a follow
        queryclient.invalidateQueries({queryKey: ["authUser"]})
       ])
    }
   });

   return{follow, isPending}
}


export default useFollow;