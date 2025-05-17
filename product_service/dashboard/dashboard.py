from jet.dashboard.dashboard import Dashboard
from product_service.dashboard.modules import SalesOverviewModule  # ชี้ให้ตรงกับ modules.py

class CustomIndexDashboard(Dashboard):
    columns = 2

    def init_with_context(self, context):
        self.children.append(SalesOverviewModule())
