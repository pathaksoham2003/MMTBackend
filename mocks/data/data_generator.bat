@echo off
echo Creating CSV data files for tiffin delivery system seeding...
echo.

REM Create timeSlots.csv
echo start_time,end_time,type > timeSlots.csv
echo "12:00","14:00",AFTERNOON >> timeSlots.csv
echo "18:00","20:00",EVENING >> timeSlots.csv
echo ✅ timeSlots.csv created

REM Create subscriptionTypes.csv
echo type,buffer_days,provided_tiffins > subscriptionTypes.csv
echo "MONTHLY",2,30 >> subscriptionTypes.csv
echo "WEEKLY",1,7 >> subscriptionTypes.csv
echo "DAILY",0,1 >> subscriptionTypes.csv
echo ✅ subscriptionTypes.csv created

REM Create daySlotTypes.csv
echo time,type > daySlotTypes.csv
echo "12:00 PM - 02:00 PM",AFTERNOON >> daySlotTypes.csv
echo "06:00 PM - 08:00 PM",EVENING >> daySlotTypes.csv
echo ✅ daySlotTypes.csv created

REM Create tiffinTypes.csv
echo name,description > tiffinTypes.csv
echo "SPECIAL","Premium tiffin with extra variety and quality ingredients" >> tiffinTypes.csv
echo "NORMAL","Standard tiffin with regular home-style meals" >> tiffinTypes.csv
echo ✅ tiffinTypes.csv created

REM Create locations.csv
echo name,coordinates_type,longitude,latitude,radius,isActive > locations.csv
echo "Mumbai Central","Point",72.8177,19.0176,5000,true >> locations.csv
echo "Delhi NCR","Point",77.1025,28.7041,8000,true >> locations.csv
echo "Bangalore Tech Park","Point",77.5946,12.9716,6000,true >> locations.csv
echo "Chennai Marina","Point",80.2707,13.0827,4500,true >> locations.csv
echo "Pune IT Hub","Point",73.8567,18.5204,5500,true >> locations.csv
echo ✅ locations.csv created

REM Create users.csv
echo name,avatar,role,phone,otp,email,is_active > users.csv
echo "John Doe","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",CUSTOMER,9876543210,1234,"john.doe@email.com",true >> users.csv
echo "Jane Smith","https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",CUSTOMER,9876543211,1235,"jane.smith@email.com",true >> users.csv
echo "Mike Johnson","https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",CUSTOMER,9876543212,1236,"mike.johnson@email.com",true >> users.csv
echo "Sarah Wilson","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",CUSTOMER,9876543213,1237,"sarah.wilson@email.com",true >> users.csv
echo "David Brown","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",DELIVERY,9876543214,1238,"david.brown@email.com",true >> users.csv
echo "Lisa Garcia","https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",DELIVERY,9876543215,1239,"lisa.garcia@email.com",true >> users.csv
echo "Tom Anderson","https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",DELIVERY,9876543216,1240,"tom.anderson@email.com",true >> users.csv
echo "Raj Patel","https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",MESS_OWNER,9876543217,1241,"raj.patel@email.com",true >> users.csv
echo "Priya Sharma","https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",MESS_OWNER,9876543218,1242,"priya.sharma@email.com",true >> users.csv
echo "Amit Kumar","https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",MESS_OWNER,9876543219,1243,"amit.kumar@email.com",true >> users.csv
echo "Admin User","https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",SUPER_ADMIN,9876543220,1244,"admin@tiffindelivery.com",true >> users.csv
echo ✅ users.csv created

REM Create addresses.csv (new model)
echo user_phone,line1,line2,instructions,tag,longitude,latitude,is_active > addresses.csv
echo 9876543210,"123 Main Street","Apt 4B","Ring the bell twice","HOME",72.8177,19.0176,true >> addresses.csv
echo 9876543211,"456 Park Avenue","","Security gate entry","OFFICE",77.1025,28.7041,true >> addresses.csv
echo 9876543212,"789 Oak Lane","Floor 2","Call before delivery","HOME",77.5946,12.9716,true >> addresses.csv
echo 9876543213,"321 Pine Street","","Opposite park","HOME",80.2707,13.0827,true >> addresses.csv
echo 9876543214,"654 Elm Drive","","Near metro station","HOME",73.8567,18.5204,true >> addresses.csv
echo 9876543215,"987 Birch Road","Bldg C","Wing A entrance","OFFICE",72.8777,19.0976,true >> addresses.csv
echo 9876543216,"147 Cedar Court","","Ground floor","HOME",77.2025,28.6041,true >> addresses.csv
echo ✅ addresses.csv created

REM Create messDetails.csv (updated with mess_owner reference)
echo mess_owner_phone,phone,mess_photos,line1,line2,city,state,pincode > messDetails.csv
echo 9876543217,9876543217,"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop","258 Curry Lane","","Ahmedabad","Gujarat","380001" >> messDetails.csv
echo 9876543218,9876543218,"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop","369 Spice Street","Shop 1","Jaipur","Rajasthan","302001" >> messDetails.csv
echo 9876543219,9876543219,"https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop","741 Food Plaza","Unit 5","Lucknow","Uttar Pradesh","226001" >> messDetails.csv
echo ✅ messDetails.csv created

REM Create subscriptions.csv (updated schema)
echo name,mess_owner_phone,day_slot_type,price,subscription_type,time_slot_type,veg_only,active > subscriptions.csv
echo "Premium Afternoon Plan",9876543217,AFTERNOON,150.00,MONTHLY,AFTERNOON,true,true >> subscriptions.csv
echo "Deluxe Evening Plan",9876543217,EVENING,180.00,MONTHLY,EVENING,false,true >> subscriptions.csv
echo "Standard Afternoon Plan",9876543218,AFTERNOON,120.00,WEEKLY,AFTERNOON,true,true >> subscriptions.csv
echo "Premium Evening Plan",9876543218,EVENING,200.00,MONTHLY,EVENING,false,true >> subscriptions.csv
echo "Daily Lunch Special",9876543219,AFTERNOON,90.00,WEEKLY,AFTERNOON,true,true >> subscriptions.csv
echo "Gourmet Evening Plan",9876543219,EVENING,250.00,MONTHLY,EVENING,false,true >> subscriptions.csv
echo ✅ subscriptions.csv created

REM Create tiffins.csv (updated schema)
echo mess_owner_phone,quantity,unit,nutrition,protein,tiffin_type,is_veg,photos,maximum_price,active > tiffins.csv
echo 9876543217,1,"box","Balanced meal with carbs and proteins","15g",SPECIAL,true,"https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",180.00,true >> tiffins.csv
echo 9876543218,1,"box","Rich in fiber and vitamins","12g",NORMAL,true,"https://images.unsplash.com/photo-1563379091339-03246668d312?w=800&h=600&fit=crop",150.00,true >> tiffins.csv
echo 9876543219,1,"box","High protein content","20g",SPECIAL,false,"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop",200.00,true >> tiffins.csv
echo 9876543217,1,"box","Light and healthy","10g",NORMAL,true,"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",120.00,true >> tiffins.csv
echo 9876543218,1,"box","Nutritious and filling","18g",SPECIAL,false,"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop",190.00,true >> tiffins.csv
echo 9876543219,1,"box","Traditional homestyle","14g",NORMAL,true,"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",140.00,true >> tiffins.csv
echo 9876543217,1,"box","Protein rich meal","22g",SPECIAL,false,"https://images.unsplash.com/photo-1631709971765-4b03e4a6ce34?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop",220.00,true >> tiffins.csv
echo 9876543218,1,"box","Balanced nutrition","16g",NORMAL,true,"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",160.00,true >> tiffins.csv
echo ✅ tiffins.csv created

REM Create userSubscriptions.csv (updated schema)
echo customer_phone,mess_owner_phone,subscription_name,end_date,delivery_line1,delivery_city,delivery_state,delivery_pincode,delivery_label,total_tiffins_left,payment_id,payment_status,payment_amount,is_active > userSubscriptions.csv
echo 9876543210,9876543217,"Premium Afternoon Plan","2025-09-08","123 Main Street","Mumbai","Maharashtra","400001","Home",25,"PAY_001","completed",4500.00,true >> userSubscriptions.csv
echo 9876543211,9876543218,"Standard Afternoon Plan","2025-08-28","456 Park Avenue","Delhi","Delhi","110001","Office",12,"PAY_002","completed",2160.00,true >> userSubscriptions.csv
echo 9876543212,9876543219,"Premium Evening Plan","2025-09-15","789 Oak Lane","Bangalore","Karnataka","560001","Home",28,"PAY_003","completed",4200.00,true >> userSubscriptions.csv
echo 9876543213,9876543217,"Daily Lunch Special","2025-08-25","321 Pine Street","Chennai","Tamil Nadu","600001","Home",8,"PAY_004","completed",1200.00,true >> userSubscriptions.csv
echo 9876543210,9876543218,"Deluxe Evening Plan","2025-09-20","123 Main Street","Mumbai","Maharashtra","400001","Home",30,"PAY_005","completed",2700.00,true >> userSubscriptions.csv
echo 9876543212,9876543219,"Gourmet Evening Plan","2025-09-10","789 Oak Lane","Bangalore","Karnataka","560001","Home",15,"PAY_006","completed",3000.00,true >> userSubscriptions.csv
echo 9876543213,9876543217,"Premium Afternoon Plan","2025-08-30","321 Pine Street","Chennai","Tamil Nadu","600001","Home",20,"PAY_007","pending",4000.00,true >> userSubscriptions.csv
echo ✅ userSubscriptions.csv created

REM Create orders.csv (updated schema)
echo customer_phone,mess_owner_phone,subscription_name,tiffin_type,status,address_line1,address_line2,city,state,pincode,address_label,delivery_boy_phone,payment_id,payment_status,payment_amount,delivered_at,amount > orders.csv
echo 9876543210,9876543217,"Premium Afternoon Plan",SPECIAL,"DELIVERED","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home",9876543214,"ORD_PAY_001","completed",180.00,"2025-08-07 14:30:00",180.00 >> orders.csv
echo 9876543211,9876543218,"Standard Afternoon Plan",NORMAL,"IN_PROCESS","456 Park Avenue","","Delhi","Delhi","110001","Office",,"ORD_PAY_002","pending",150.00,"",150.00 >> orders.csv
echo 9876543212,9876543219,"Premium Evening Plan",SPECIAL,"DELIVERED","789 Oak Lane","Floor 2","Bangalore","Karnataka","560001","Home",9876543215,"ORD_PAY_003","completed",200.00,"2025-08-06 19:15:00",200.00 >> orders.csv
echo 9876543213,9876543217,"Daily Lunch Special",NORMAL,"OUT_FOR_DELIVERY","321 Pine Street","","Chennai","Tamil Nadu","600001","Home",9876543216,"ORD_PAY_004","pending",120.00,"",120.00 >> orders.csv
echo 9876543210,9876543218,"Deluxe Evening Plan",SPECIAL,"DELIVERED","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home",9876543214,"ORD_PAY_005","completed",190.00,"2025-08-05 13:45:00",190.00 >> orders.csv
echo 9876543212,9876543219,"Gourmet Evening Plan",NORMAL,"ACCEPTED","789 Oak Lane","Floor 2","Bangalore","Karnataka","560001","Home",,"ORD_PAY_006","completed",140.00,"",140.00 >> orders.csv
echo 9876543213,9876543217,"Premium Afternoon Plan",SPECIAL,"DELIVERED","321 Pine Street","","Chennai","Tamil Nadu","600001","Home",9876543215,"ORD_PAY_007","completed",220.00,"2025-08-04 12:20:00",220.00 >> orders.csv
echo 9876543211,9876543218,"Standard Afternoon Plan",NORMAL,"IN_PROCESS","456 Park Avenue","","Delhi","Delhi","110001","Office",,"ORD_PAY_008","pending",160.00,"",160.00 >> orders.csv
echo 9876543210,9876543217,"Premium Afternoon Plan",SPECIAL,"DELIVERED","123 Main Street","Apt 4B","Mumbai","Maharashtra","400001","Home",9876543214,"ORD_PAY_009","completed",180.00,"2025-08-03 14:15:00",180.00 >> orders.csv
echo 9876543211,9876543219,"Daily Lunch Special",NORMAL,"NOT_ACCEPTED","456 Park Avenue","","Delhi","Delhi","110001","Office",,"ORD_PAY_010","refunded",150.00,"",150.00 >> orders.csv
echo ✅ orders.csv created

REM Create deliveryFeedback.csv (updated with proper references)
echo user_phone,delivery_order_payment_id,feedback_image,rating,comment > deliveryFeedback.csv
echo 9876543210,"ORD_PAY_001","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",5,"Excellent delivery service! Food arrived hot and on time." >> deliveryFeedback.csv
echo 9876543211,"ORD_PAY_002","https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",4,"Good delivery but was slightly delayed." >> deliveryFeedback.csv
echo 9876543212,"ORD_PAY_003","",3,"Average service, food was warm but delivery boy was not polite." >> deliveryFeedback.csv
echo 9876543213,"ORD_PAY_004","https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&h=300&fit=crop",5,"Outstanding! Will definitely order again." >> deliveryFeedback.csv
echo 9876543210,"ORD_PAY_005","",4,"Good overall experience, minor packaging issue." >> deliveryFeedback.csv
echo 9876543212,"ORD_PAY_006","https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",2,"Food was cold when delivered and packaging was damaged." >> deliveryFeedback.csv
echo 9876543213,"ORD_PAY_007","",5,"Perfect delivery! Quick and professional service." >> deliveryFeedback.csv
echo 9876543211,"ORD_PAY_008","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",4,"Delivery was on time but could improve communication." >> deliveryFeedback.csv
echo 9876543210,"ORD_PAY_009","",3,"Decent service but delivery location was confused initially." >> deliveryFeedback.csv
echo 9876543211,"ORD_PAY_010","https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",5,"Excellent service! Best delivery experience so far." >> deliveryFeedback.csv
echo ✅ deliveryFeedback.csv created

REM Create foodFeedback.csv (updated with proper references)
echo user_phone,tiffin_mess_phone,tiffin_type,feedback_image,rating,comment > foodFeedback.csv
echo 9876543210,9876543217,SPECIAL,"https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",5,"Delicious food! Perfect taste and quantity." >> foodFeedback.csv
echo 9876543211,9876543218,NORMAL,"",4,"Good taste but could use more variety in vegetables." >> foodFeedback.csv
echo 9876543212,9876543219,SPECIAL,"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",3,"Food was okay, rice was a bit dry." >> foodFeedback.csv
echo 9876543213,9876543217,NORMAL,"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",5,"Amazing flavors! Best tiffin service in the area." >> foodFeedback.csv
echo 9876543210,9876543218,SPECIAL,"",4,"Fresh ingredients and good packaging. Satisfied with the meal." >> foodFeedback.csv
echo 9876543212,9876543219,NORMAL,"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",2,"Food was too spicy and not as described." >> foodFeedback.csv
echo 9876543213,9876543217,SPECIAL,"",5,"Outstanding quality! Homely taste and generous portions." >> foodFeedback.csv
echo 9876543211,9876543218,NORMAL,"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",4,"Good food quality, would recommend to others." >> foodFeedback.csv
echo 9876543210,9876543219,NORMAL,"",3,"Average taste, expected better based on reviews." >> foodFeedback.csv
echo 9876543212,9876543217,SPECIAL,"https://images.unsplash.com/photo-1563379091339-03246668d312?w=600&h=400&fit=crop",5,"Perfect meal! Fresh, tasty and well-balanced nutrition." >> foodFeedback.csv
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
echo - tiffinTypes.csv (2 records - NORMAL and SPECIAL)
echo - locations.csv (5 records)
echo - users.csv (11 records)
echo - addresses.csv (7 records)
echo - messDetails.csv (3 records)
echo - subscriptions.csv (6 records)
echo - tiffins.csv (8 records)
echo - userSubscriptions.csv (7 records)
echo - orders.csv (10 records)
echo - deliveryFeedback.csv (10 records)
echo - foodFeedback.csv (10 records)
echo.
echo Key Updates:
echo - Added new Location model CSV
echo - Added new Address model CSV
echo - Updated tiffin types to NORMAL and SPECIAL
echo - Fixed foreign key relationships using phone numbers
echo - Updated time slots to use 24-hour format (HH:MM)
echo - Improved data consistency across all models
echo.
echo Ready to run the seeder! Use: node index.js
echo.
pause