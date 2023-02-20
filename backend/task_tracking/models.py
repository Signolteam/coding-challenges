from django.db import models
from django.utils.translation import gettext_lazy as _


class Task(models.Model):
    APPROVE = 'AP'
    IN_REVIEW = 'IR'
    REJECTED = 'RJ'

    STATUSES = [
        (APPROVE, 'Approve'),
        (IN_REVIEW, 'In review'),
        (REJECTED, 'Rejected'),
    ]

    owner = models.CharField(
        verbose_name=_("owner"),
        max_length=55,
    )
    email = models.EmailField(
        verbose_name=_("email"),
    )
    company_name = models.CharField(
        verbose_name=_("company_name"),
        max_length=55,
    )
    date = models.DateField()
    description = models.TextField(max_length=1000)
    status = models.CharField(
        max_length=2,
        default=IN_REVIEW,
    )

    class Meta:
        db_table = "tasks"
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self) -> str:
        return self.description
