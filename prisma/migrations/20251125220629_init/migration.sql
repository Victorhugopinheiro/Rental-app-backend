-- AlterTable
ALTER TABLE "_TenantFavorites" ADD CONSTRAINT "_TenantFavorites_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TenantFavorites_AB_unique";

-- AlterTable
ALTER TABLE "_TenantProperties" ADD CONSTRAINT "_TenantProperties_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TenantProperties_AB_unique";
