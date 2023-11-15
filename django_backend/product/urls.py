from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . views import ProductList,CartItemList,CartItemDetail,CartDetail,RegisterApi
urlpatterns = [
    # product - for list of products and create product.
    path('products/', ProductList.as_view(), name='product-list'),
   
    path('cartitems/', CartItemList.as_view(), name='cartitem-list'),
    path('cartitems/<int:pk>/', CartItemDetail.as_view(), name='cartitem-detail'),
    path('carts/', CartDetail.as_view(), name='cart-detail'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',RegisterApi.as_view(), name='register'),
]