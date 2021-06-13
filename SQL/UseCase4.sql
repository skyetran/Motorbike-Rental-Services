-- View: January Sales Report
CREATE VIEW [January Sales Report] AS
    SELECT SUM(P.ProductPrice * A.Quantity) AS [January Sales Report]
      FROM ADDS AS A,
           PRODUCT AS P
     WHERE A.ProductID = P.ProductID AND 
           A.CartID IN (
               SELECT SC.CartID
                 FROM SHOPPING_CART AS SC
                WHERE strftime('%m', SC.StartDate) = '01'
           );


-- View: Total_Revenue Since Beginning
CREATE VIEW Total_Revenuee AS
    SELECT SUM(P.ProductPrice * A.Quantity) AS Total_Revenue
      FROM ADDS AS A,
           PRODUCT AS P
     WHERE A.ProductID = P.ProductID;


-- View: Weekly Sales Report
CREATE OR REPLACE VIEW WeeklySales AS
    SELECT SUM(P.ProductPrice * A.Quantity) AS WeeklySale
      FROM ADDS AS A,
           PRODUCT AS P
     WHERE A.ProductID = P.ProductID AND 
           A.CartID IN (
               SELECT SC.CartID
                 FROM SHOPPING_CART AS SC
                WHERE SC.StartDate >= CURDATE() - INTERVAL 7 DAY
           );
