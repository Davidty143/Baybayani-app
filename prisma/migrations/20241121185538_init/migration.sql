/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Orders` table. All the data in the column will be lost.
  - You are about to alter the column `totalPrice` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderStatus",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "quantity",
DROP COLUMN "total_price",
ADD COLUMN     "modified_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
