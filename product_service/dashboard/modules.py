# modules.py
from jet.dashboard.modules import DashboardModule
from order_management.models import Order
from django.utils import timezone

class SalesOverviewModule(DashboardModule):
    title = 'ยอดขายรายวัน (7 วันล่าสุด)'
    template = 'dashboard/sales_overview.html'
    limit = 7

    def init_with_context(self, context):
        today = timezone.now().date()
        last_days = [today - timezone.timedelta(days=i) for i in range(self.limit)]
        last_days.reverse()

        labels = [day.strftime('%d/%m') for day in last_days]
        data = []

        for day in last_days:
            count = Order.objects.filter(created_at__date=day).count()
            data.append(count)

        self.context = {
            'labels': labels,
            'data': data
        }
