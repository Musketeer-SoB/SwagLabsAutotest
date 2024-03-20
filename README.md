Containing seven simple tests.

**LoginPageTest.spec.ts contains following:**
- EnterUsername: Main goal is to verify that it isn't possible to log in to users account without including password -> It musn't be possible to access potentially sensitive data without password
- EnterWrongPassword: It isn't possible to access user account when using wrong password -> It musn't be possible to access potentially sensitive data without password
- Login Successfully: It's possible to log in and reach the shop

**shopTest.spec.ts contains the following:**
- AddToCart: Verifying if it is possible to add products to cart and it's possible to remove products from cart, UI elements react properly -> Very basic interaction with the shop that a potential buyer (user who are we really interested in) will definitelly use
- CheckItemContents: All necessarry data are included in product container -> Products are the first thing the user sees
- SortItems: Sorting items reacts as us should -> This one was more of a training task in the begining of my journey
- CheckDetails: Open details of a product and verify all necessarry elements are included -> Detailed description needs to be accessible and shown properly to allow user to make informed decision about purchase