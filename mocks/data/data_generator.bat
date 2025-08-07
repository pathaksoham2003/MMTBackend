@echo off
echo Creating CSV data files for tiffin delivery system seeding...
echo.

REM Create timeSlots.csv
echo time,type > timeSlots.csv
echo "12:00 PM - 02:00 PM",AFTERNOON >> timeSlots.csv
echo "06:00 PM - 08:00 PM",EVENING >> timeSlots.csv
echo ✅ timeSlots.csv created

REM Create subscriptionTypes.csv
echo time,type > subscriptionTypes.csv
echo "30 days",Monthly >> subscriptionTypes.csv
echo "7 days",Weekly >> subscriptionTypes.csv
echo "1 day",Daily >> subscriptionTypes.csv
echo ✅ subscriptionTypes.csv created

REM Create daySlotTypes.csv
echo time,type > daySlotTypes.csv
echo "12:00 PM - 02:00 PM",Afternoon >> daySlotTypes.csv
echo "06:00 PM - 08:00 PM",Evening >> daySlotTypes.csv
echo ✅ daySlotTypes.csv created

REM Create tiffinTypes.csv
echo name,description > tiffinTypes.csv
echo "Special","Premium tiffin with extra variety and quality ingredients" >> tiffinTypes.csv
echo "General","Standard tiffin with regular home-style meals" >> tiffinTypes.csv
echo ✅ tiffinTypes.csv created

REM Create users.csv
echo name,avatar,role,phone,otp,address_line1,address_line2,city,state,pincode,is_active > users.csv
echo "John Doe","https://example.com/avatar1.jpg",CUSTOMER,9876543210,1234,"123 Main Street","Apt 4B","Mumbai","Maharashtra","400001",true >> users.csv
echo "Jane Smith","https://example.com/avatar2.jpg",CUSTOMER,9876543211,1235,"456 Park Avenue","","Delhi","Delhi","110001",true >> users.csv
echo "Mike Johnson","https://example.com/avatar3.jpg",CUSTOMER,9876543212,1236,"789 Oak Lane","Floor 2","Bangalore","Karnataka","560001",true >> users.csv
echo "Sarah Wilson","https://example.com/avatar4.jpg",CUSTOMER,9876543213,1237,"321 Pine Street","","Chennai","Tamil Nadu","600001",true >> users.csv
echo "David Brown","https://example.com/avatar5.jpg",DELIVERY,9876543214,1238,"654 Elm Drive","","Pune","Maharashtra","411001",true >> users.csv
echo "Lisa Garcia","https://example.com/avatar6.jpg",DELIVERY,9876543215,1239,"987 Birch Road","Bldg C","Hyderabad","Telangana","500001",true >> users.csv
echo "Tom Anderson","https://example.com/avatar7.jpg",DELIVERY,9876543216,1240,"147 Cedar Court","","Kolkata","West Bengal","700001",true >> users.csv
echo "Raj Patel","https://example.com/avatar8.jpg",MESS_OWNER,9876543217,1241,"258 Curry Lane","","Ahmedabad","Gujarat","380001",true >> users.csv
echo "Priya Sharma","https://example.com/avatar9.jpg",MESS_OWNER,9876543218,1242,"369 Spice Street","Shop 1","Jaipur","Rajasthan","302001",true >> users.csv
echo "Amit Kumar","https://example.com/avatar10.jpg",MESS_OWNER,9876543219,1243,"741 Food Plaza","Unit 5","Lucknow","Uttar Pradesh","226001",true >> users.csv
echo "Admin User","https://example.com/avatar11.jpg",SUPER_ADMIN,9876543220,1244,"852 Admin Tower","Floor 10","Mumbai","Maharashtra","400002",true >> users.csv
echo ✅ users.csv created

REM Create messDetails.csv
echo phone,mess_photos,menu_items,address_line1,address_line2,city,state,pincode > messDetails.csv
echo 9876543217,"https://example.com/mess1_1.jpg,https://example.com/mess1_2.jpg","Dal Rice,Roti,Sabzi,Pickle","258 Curry Lane","","Ahmedabad","Gujarat","380001" >> messDetails.csv
echo 9876543218,"https://example.com/mess2_1.jpg,https://example.com/mess2_2.jpg","Rajma Chawal,Naan,Paneer Curry,Raita","369 Spice Street","Shop 1","Jaipur","Rajasthan","302001" >> messDetails.csv
echo 9876543219,"https://example.com/mess3_1.jpg,https://example.com/mess3_2.jpg","Chole Bhature,Paratha,Aloo Gobi,Lassi","741 Food Plaza","Unit 5","Lucknow","Uttar Pradesh","226001" >> messDetails.csv
echo ✅ messDetails.csv created

REM Create subscriptions.csv
echo day_slot_type,price,time_slot_type,buffer_days,provided_tiffins,veg_only > subscriptions.csv
echo Afternoon,150.00,AFTERNOON,2,30,true >> subscriptions.csv
echo Evening,180.00,EVENING,3,30,false >> subscriptions.csv
echo Afternoon,120.00,AFTERNOON,1,15,true >> subscriptions.csv
echo Evening,200.00,EVENING,2,30,false >> subscriptions.csv
echo Afternoon,90.00,AFTERNOON,1,7,true >> subscriptions.csv
echo Evening,250.00,EVENING,3,30,false >> subscriptions.csv
echo ✅ subscriptions.csv created

REM Create tiffins.csv
echo mess_phone,quantity,unit,nutrition,protein,type_name,is_veg,photos,maximum_price > tiffins.csv
echo 9876543217,1,"box","Balanced meal with carbs and proteins","15g","Special",true,"https://example.com/tiffin1.jpg,https://example.com/tiffin1_2.jpg",180.00 >> tiffins.csv
echo 9876543218,1,"box","Rich in fiber and vitamins","12g","General",true,"https://example.com/tiffin2.jpg",150.00 >> tiffins.csv
echo 9876543219,1,"box","High protein content","20g","Special",false,"https://example.com/tiffin3.jpg,https://example.com/tiffin3_2.jpg",200.00 >> tiffins.csv
echo 9876543217,1,"box","Light and healthy","10g","General",true,"https://example.com/tiffin4.jpg",120.00 >> tiffins.csv
echo 9876543218,1,"box","Nutritious and filling","18g","Special",false,"https://example.com/tiffin5.jpg",190.00 >> tiffins.csv
echo 9876543219,1,"box","Traditional homestyle","14g","General",true,"https://example.com/tiffin6.jpg",140.00 >> tiffins.csv
echo 9876543217,1,"box","Protein rich meal","22g","Special",false,"https://example.com/tiffin7.jpg,https://example.com/tiffin7_2.jpg",220.00 >> tiffins.csv
echo 9876543218,1,"box","Balanced nutrition","16g","General",true,"https://example.com/tiffin8.jpg",160.00 >> tiffins.csv
echo ✅ tiffins.csv created

REM Create userSubscriptions.csv
echo end_date,delivery_line1,delivery_city,delivery_state,delivery_pincode,delivery_label,total_tiffins_left,payment_id,payment_status,payment_amount,is_active > userSubscriptions.csv
echo "2025-09-08","123 Main Street","Mumbai","Maharashtra","400001","Home",25,"PAY_001","completed",4500.00,true >> userSubscriptions.csv
echo "2025-08-28","456 Park Avenue","Delhi","Delhi","110001","Office",12,"PAY_002","completed",2160.00,true >> userSubscriptions.csv
echo "2025-09-15","789 Oak Lane","Bangalore","Karnataka","560001","Home",28,"PAY_003","completed",4200.00,true >> userSubscriptions.csv
echo "2025-08-25","321 Pine Street","Chennai","Tamil Nadu","600001","Home",8,"PAY_004","completed",1200.00,true >> userSubscriptions.csv
echo "2025-09-20","654 Elm Drive","Pune","Maharashtra","411001","Home",30,"PAY_005","completed",2700.00,true >> userSubscriptions.csv
echo "2025-09-10","987 Birch Road","Hyderabad","Telangana","500001","Office",15,"PAY_006","completed",3000.00,true >> userSubscriptions.csv
echo "2025-08-30","147 Cedar Court","Kolkata","West Bengal","700001","Home",20,"PAY_007","pending",4000.00,true >> userSubscriptions.csv
echo ✅ userSubscriptions.csv created

REM Create orders.csv
echo status,address_line1,address_line2,city,state,pincode,address_label,payment_id,payment_status,payment_amount,delivered_at,amount > orders.csv
echo "delivered","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home","ORD_PAY_001","completed",180.00,"2025-08-07 14:30:00",180.00 >> orders.csv
echo "in_process","456 Park Avenue","","Delhi","Delhi","110001","Office","ORD_PAY_002","pending",150.00,"",150.00 >> orders.csv
echo "delivered","789 Oak Lane","Floor 2","Bangalore","Karnataka","560001","Home","ORD_PAY_003","completed",200.00,"2025-08-06 19:15:00",200.00 >> orders.csv
echo "out_of_delivery","321 Pine Street","","Chennai","Tamil Nadu","600001","Home","ORD_PAY_004","pending",120.00,"",120.00 >> orders.csv
echo "delivered","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home","ORD_PAY_005","completed",190.00,"2025-08-05 13:45:00",190.00 >> orders.csv
echo "accepted","654 Elm Drive","","Pune","Maharashtra","411001","Home","ORD_PAY_006","completed",140.00,"",140.00 >> orders.csv
echo "delivered","987 Birch Road","Bldg C","Hyderabad","Telangana","500001","Office","ORD_PAY_007","completed",220.00,"2025-08-04 12:20:00",220.00 >> orders.csv
echo "in_process","147 Cedar Court","","Kolkata","West Bengal","700001","Home","ORD_PAY_008","pending",160.00,"",160.00 >> orders.csv
echo "delivered","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home","ORD_PAY_009","completed",180.00,"2025-08-03 14:15:00",180.00 >> orders.csv
echo "not_accepted","456 Park Avenue","","Delhi","Delhi","110001","Office","ORD_PAY_010","refunded",150.00,"",150.00 >> orders.csv
echo ✅ orders.csv created

REM Create deliveryFeedback.csv
echo feedback_image,rating,comment > deliveryFeedback.csv
echo "https://example.com/feedback1.jpg",5,"Excellent delivery service! Food arrived hot and on time." >> deliveryFeedback.csv
echo "https://example.com/feedback2.jpg",4,"Good delivery but was slightly delayed." >> deliveryFeedback.csv
echo "",3,"Average service, food was warm but delivery boy was not polite." >> deliveryFeedback.csv
echo "https://example.com/feedback3.jpg",5,"Outstanding! Will definitely order again." >> deliveryFeedback.csv
echo "",4,"Good overall experience, minor packaging issue." >> deliveryFeedback.csv
echo "https://example.com/feedback4.jpg",2,"Food was cold when delivered and packaging was damaged." >> deliveryFeedback.csv
echo "",5,"Perfect delivery! Quick and professional service." >> deliveryFeedback.csv
echo "https://example.com/feedback5.jpg",4,"Delivery was on time but could improve communication." >> deliveryFeedback.csv
echo "",3,"Decent service but delivery location was confused initially." >> deliveryFeedback.csv
echo "https://example.com/feedback6.jpg",5,"Excellent service! Best delivery experience so far." >> deliveryFeedback.csv
echo ✅ deliveryFeedback.csv created

REM Create foodFeedback.csv
echo feedback_image,rating,comment > foodFeedback.csv
echo "https://example.com/food1.jpg",5,"Delicious food! Perfect taste and quantity." >> foodFeedback.csv
echo "",4,"Good taste but could use more variety in vegetables." >> foodFeedback.csv
echo "https://example.com/food2.jpg",3,"Food was okay, rice was a bit dry." >> foodFeedback.csv
echo "https://example.com/food3.jpg",5,"Amazing flavors! Best tiffin service in the area." >> foodFeedback.csv
echo "",4,"Fresh ingredients and good packaging. Satisfied with the meal." >> foodFeedback.csv
echo "https://example.com/food4.jpg",2,"Food was too spicy and not as described." >> foodFeedback.csv
echo "",5,"Outstanding quality! Homely taste and generous portions." >> foodFeedback.csv
echo "https://example.com/food5.jpg",4,"Good food quality, would recommend to others." >> foodFeedback.csv
echo "",3,"Average taste, expected better based on reviews." >> foodFeedback.csv
echo "https://example.com/food6.jpg",5,"Perfect meal! Fresh, tasty and well-balanced nutrition." >> foodFeedback.csv
echo ✅ foodFeedback.csv created

echo.
echo ============================================
echo All CSV data files created successfully!
echo ============================================
echo.
echo Files created:
echo - timeSlots.csv (2 records)
echo - subscriptionTypes.csv (3 records)
echo - daySlotTypes.csv (2 records)
echo - tiffinTypes.csv (2 records)
echo - users.csv (11 records)
echo - messDetails.csv (3 records)
echo - subscriptions.csv (6 records)
echo - tiffins.csv (8 records)
echo - userSubscriptions.csv (7 records)
echo - orders.csv (10 records)
echo - deliveryFeedback.csv (10 records)
echo - foodFeedback.csv (10 records)
echo.
echo Ready to run the seeder! Use: node index.js
echo.
pause