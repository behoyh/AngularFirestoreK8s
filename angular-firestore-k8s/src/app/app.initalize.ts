import { AngularFirestoreCollection } from "@angular/fire/firestore";

export class Initalize {
   public static Init(postsRef: AngularFirestoreCollection<{}>): any {
      {
         postsRef.doc("Test").set({
            name: "Beshoy Hanna",
            body: "test",
            date: "12/15/2018"
         });

         postsRef.doc("Test2").set({
            name: "Andrew Kamal",
            body: "test2",
            date: "12/15/2018"
         });
      }
   }
}