from .AccumulatePoints import AccumulatePoints
from .Addresses import Addresses
from .Admins import Admins
from .Base import Base
from .BidDocuments import BidDocuments
from .SaveDocuments import SaveDocuments
from .BidProducts import BidProducts
from .Bids import Bids
from .Buyers import Buyers
from .BlockSellers import BlockSellers
from .BuyerVouchers import BuyerVouchers
from .Categories import Categories
from .EndUsers import EndUsers
from .Favorites import Favorites
from .FollowShops import FollowShops
from .HasNotifications import HasNotifications
from .Medias import Medias
from .Logs import Logs
from .Messages import Messages
from .Notifications import Notifications
from .OfferRequests import OfferRequests
from .OperatingTimes import OperatingTimes
from .OrderItems import OrderItems
from .Orders import Orders
from .Otps import Otps
from .Payments import Payments
from .Products import Products
from .Titles import Titles
from .ProductTitles import ProductTitles
from .ProductBrands import ProductBrands
from .Questions import Questions
from .Refunds import Refunds
from .Reports import Reports
from .ReviewLikes import ReviewLikes
from .Reviews import Reviews
from .Sellers import Sellers
from .Shipments import Shipments
from .ShoppingCarts import ShoppingCarts
from .Shops import Shops
from .SubmitToBids import SubmitToBids
from .Brands import Brands
from .Tickets import Tickets
from .Users import Users
from .VoucherOrders import VoucherOrders
from .Vouchers import Vouchers
from .WithdrawalHistories import WithdrawalHistories
from .Searchs import Searchs
from .BlacklistTokens import BlacklistTokens

from typing import List
from pathlib import Path
from importlib import import_module

__all__: List[str] = []
package = __name__
package_dir = Path(__file__).resolve().parent
for path in sorted(package_dir.glob("*.py")):
    name = path.stem
    if name == "__init__" or name.startswith("_"):
        continue
    try:
        mod = import_module(
            f"{package}.{name}"
        )  # collect public class names from the module into __all__
        for attr in dir(mod):
            if attr.startswith("_"):
                continue
            obj = getattr(mod, attr)
            if isinstance(obj, type):
                __all__.append(attr)
    except Exception:
        # print traceback to help debugging import issues during alembic/env import
        import traceback

        traceback.print_exc()
# ensure Base is exported
if "Base" not in __all__ and Base is not None:
    __all__.append("Base")

    # deduplicate and sort for consistency
    __all__ = sorted(set(__all__))
